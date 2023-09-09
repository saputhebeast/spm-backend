import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, UserGuard } from '../auth/guard';
import { ShippingDetailsService } from './shipping-details.service';
import { GetUser } from '../auth/decorator';
import { makeResponse } from '../common/util';
import { ShippingDetailsCreateDto } from './dto';

@UseGuards(JwtGuard)
@Controller('shipping')
export class ShippingDetailsController {
  constructor(private shippingDetailsService: ShippingDetailsService) {}

  @Post()
  @UseGuards(UserGuard)
  async createShippingDetails(
    @GetUser('id') userId: number,
    @Body() shippingDetailsCreateDto: ShippingDetailsCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.shippingDetailsService.createShippingDetails(
      userId,
      shippingDetailsCreateDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Shipping details created successfully',
    });
  }

  @Get()
  async getShippingDetails(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data = await this.shippingDetailsService.getShippingDetails(userId);
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Shipping details retrieved successfully',
    });
  }
}
