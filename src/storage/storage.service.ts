import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { StorageRepository } from './storage.repository';
import {
  GetObjectCommand,
  HeadObjectCommand,
  ListObjectsV2Command,
  ListObjectsV2CommandOutput,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';
import { S3Dto } from './dto';
import { mapStringToS3Dto } from '../common/mapper/string.s3Dto.mapper';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StorageService {
  private readonly logger: Logger = new Logger(StorageService.name);
  private readonly s3Client: S3Client = new S3Client({
    region: this.config.getOrThrow('aws.region'),
  });

  constructor(
    private config: ConfigService,
    private storageRepository: StorageRepository,
  ) {}

  async uploadFile(fileName: string, file: Buffer): Promise<S3Dto> {
    this.logger.log('uploadFile: execution started');

    if (!file) {
      throw new Error('Please upload a file.');
    }

    const fileExtension: string = fileName.split('.').pop();
    if (!fileExtension) {
      throw new Error('Invalid file name.');
    }

    const newFileName = `${Date.now()}-${uuidv4()}.${fileExtension}`;

    await this.s3Client
      .send(
        new PutObjectCommand({
          Bucket: this.config.get('aws.bucketName'),
          Key: newFileName,
          Body: file,
        }),
      )
      .then((): void => {
        fileName = newFileName;
      })
      .catch((): void => {
        throw new Error('Error uploading the file.');
      });

    return this.mapStringToS3Dto(fileName);
  }

  async getImage(fileName: string): Promise<S3Dto> {
    this.logger.log('getImage: execution started');

    const url: string = await this.generatePresignedUrl(fileName);
    if (!url) {
      throw new Error('No image found for the given file name.');
    }

    return this.mapStringToS3Dto(url);
  }

  async getImagesFromFolder(folderName: string): Promise<{ urls: S3Dto[] }> {
    this.logger.log('getImagesFromFolder: execution started');

    const command: ListObjectsV2Command = new ListObjectsV2Command({
      Bucket: this.config.get('aws.bucketName'),
      Prefix: folderName,
    });
    const data: ListObjectsV2CommandOutput = await this.s3Client.send(command);

    if (!data || !data.Contents) {
      throw new Error('No images found in the specified folder.');
    }

    const urls = await Promise.all(
      data.Contents.map(async (object) => {
        const key = object.Key;
        const url = await this.generatePresignedUrl(key);
        return { url };
      }),
    );

    return {
      urls: urls.map((item) => this.mapStringToS3Dto(item.url)),
    };
  }

  private mapStringToS3Dto(url: string): S3Dto {
    return mapStringToS3Dto(url);
  }

  private async generatePresignedUrl(key: string): Promise<string> {
    this.logger.log('generatePresignedUrl: execution started');

    const headCommand: HeadObjectCommand = new HeadObjectCommand({
      Bucket: this.config.get('aws.bucketName'),
      Key: key,
    });

    return this.s3Client
      .send(headCommand)
      .then(() => {
        const command: GetObjectCommand = new GetObjectCommand({
          Bucket: this.config.get('aws.bucketName'),
          Key: key,
        });

        return getSignedUrl(this.s3Client, command, {
          expiresIn: 60 * 60 * 24 * 7,
        });
      })
      .catch((error) => {
        if (error.name === 'NotFound') {
          throw new NotFoundException('File not found');
        }
        throw new Error('Something went wrong');
      });
  }
}
