import { Injectable, Logger } from '@nestjs/common';
import { StorageRepository } from './storage.repository';
import {
  GetObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StorageService {
  private readonly logger: Logger = new Logger(StorageService.name);
  private readonly s3Client = new S3Client({
    region: this.config.getOrThrow('aws.region'),
  });

  constructor(
    private config: ConfigService,
    private storageRepository: StorageRepository,
  ) {}

  async uploadFile(fileName: string, file: Buffer) {
    this.logger.log('uploadFile: execution started');

    if (!file) {
      throw new Error('Please upload a file.');
    }

    const status = await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.config.get('aws.bucketName'),
        Key: fileName,
        Body: file,
      }),
    );
    return status;
  }

  async getImage(fileName: string) {
    this.logger.log('getImage: execution started');

    const url = await this.generatePresignedUrl(fileName);
    if (!url) {
      throw new Error('No image found for the given file name.');
    }
    return url;
  }

  async getImagesFromFolder(folderName: string) {
    this.logger.log('getImagesFromFolder: execution started');

    const command = new ListObjectsV2Command({
      Bucket: this.config.get('aws.bucketName'),
      Prefix: folderName,
    });
    const data = await this.s3Client.send(command);

    if (!data || !data.Contents) {
      throw new Error('No images found in the specified folder.');
    }

    const keys = data.Contents.map(async (object) => {
      const key = object.Key;
      const url = await this.generatePresignedUrl(key);
      return { key, url };
    });

    return Promise.all(keys).then((results) => results.slice(1));
  }

  private async generatePresignedUrl(key: string) {
    this.logger.log('generatePresignedUrl: execution started');

    const command = new GetObjectCommand({
      Bucket: this.config.get('aws.bucketName'),
      Key: key,
    });

    const url = await getSignedUrl(this.s3Client, command, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    return url;
  }
}
