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
import { JwtGuard, ManagerSuperAdminGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { ItemService } from './item.service';
import { ItemCreateDto, ItemEditDto, ItemResponseDto } from './dto';
import { makeResponse } from '../common/util';

@UseGuards(JwtGuard)
@Controller('item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  @UseGuards(ManagerSuperAdminGuard)
  async createItem(
    @GetUser('id') userId: number,
    @Body() itemDto: ItemCreateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: ItemResponseDto = await this.itemService.createItem(
      userId,
      itemDto,
    );

    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Item created successfully',
    });
  }

  @Get(':id')
  async getPackageById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: ItemResponseDto = await this.itemService.getItem(
      userId,
      itemId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Package retrieved successfully',
    });
  }

  @Get()
  async getAllItems(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: { items: ItemResponseDto[] } =
      await this.itemService.getAllItems(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Items retrieved successfully',
    });
  }

  @Patch(':id')
  @UseGuards(ManagerSuperAdminGuard)
  async updateItem(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
    @Body() updateDto: ItemEditDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: ItemResponseDto = await this.itemService.updateItem(
      userId,
      itemId,
      updateDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Item updated successfully',
    });
  }

  @Delete(':id')
  @UseGuards(ManagerSuperAdminGuard)
  async deleteItem(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) itemId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: ItemResponseDto = await this.itemService.deleteItem(
      userId,
      itemId,
    );
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Item deleted successfully',
    });
  }
}
