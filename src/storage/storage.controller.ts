import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard';
import { makeResponse } from '../common/util';
import { S3Dto } from './dto';

@UseGuards(JwtGuard)
@Controller('s3')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async fileUpload(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ): Promise<void> {
    const data: S3Dto = await this.storageService.uploadFile(
      file.originalname,
      file.buffer,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'File uploaded successfully',
    });
  }

  @Get()
  async getImageByName(
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ): Promise<void> {
    const data: S3Dto = await this.storageService.getImage(fileName);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Image url retrieved successfully',
    });
  }

  @Get('images')
  async getImagesByFolderName(
    @Query('folderName') folderName: string,
    @Res() res: Response,
  ): Promise<void> {
    const data: { urls: S3Dto[] } =
      await this.storageService.getImagesFromFolder(folderName);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data: data,
      message: 'Image urls retrieved successfully',
    });
  }
}
