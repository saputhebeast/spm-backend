import {
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('s3')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  fileUpload(@UploadedFile() file: Express.Multer.File) {
    return this.storageService.uploadFile(file.originalname, file.buffer);
  }

  @Get()
  getImageByName(@Query('fileName') fileName: string) {
    return this.storageService.getImage(fileName);
  }

  @Get('images')
  getImagesByFolderName(@Query('folderName') folderName: string) {
    return this.storageService.getImagesFromFolder(folderName);
  }
}
