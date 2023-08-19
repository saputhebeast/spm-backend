import { JwtGuard, SuperAdminGuard } from '../auth/guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { SellerService } from './seller.service';
import { makeResponse } from '../common/util';
import { GetUser } from '../auth/decorator';
import { SellerCreateDto, SellerResponseDto } from './dto';

@UseGuards(JwtGuard)
@Controller('seller')
export class SellerController {
  constructor(private sellerService: SellerService) {}

  @Post()
  @UseGuards(SuperAdminGuard)
  async createSeller(
    @GetUser('id') userId: number,
    @Body() sellerDto: SellerCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: SellerResponseDto = await this.sellerService.createSeller(
      userId,
      sellerDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Seller created successfully',
    });
  }

  @Get(':id')
  @UseGuards(SuperAdminGuard)
  async getSellerById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) sellerId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: SellerResponseDto = await this.sellerService.getSellerById(
      userId,
      sellerId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Seller retrieved successfully',
    });
  }

  @Get()
  @UseGuards(SuperAdminGuard)
  async getAllSellers(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { sellers: SellerResponseDto[] } =
      await this.sellerService.getAllSellers(userId);

    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Sellers retrieved successfully',
    });
  }

  @Patch(':id')
  @UseGuards(SuperAdminGuard)
  async updatePackage(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) sellerId: number,
    @Body() sellerUpdateDto: SellerCreateDto,
    @Res() res: Response,
  ): Promise<any> {
    const data: SellerResponseDto = await this.sellerService.updateSeller(
      userId,
      sellerId,
      sellerUpdateDto,
    );

    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Seller updated successfully',
    });
  }

  @Delete(':id')
  @UseGuards(SuperAdminGuard)
  async deleteSeller(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) sellerId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: SellerResponseDto = await this.sellerService.deleteSeller(
      userId,
      sellerId,
    );

    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Seller deleted successfully',
    });
  }
}
