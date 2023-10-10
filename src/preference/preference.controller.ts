import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, SuperAdminGuard, UserGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { makeResponse } from '../common/util';
import { PreferenceService } from './preference.service';
import { PreferenceCreateUpdateDto, PreferenceResponseDto } from './dto';

@Controller('preference')
@UseGuards(JwtGuard)
export class PreferenceController {
  constructor(private preferenceService: PreferenceService) {}

  @Post('/userId')
  @UseGuards(SuperAdminGuard)
  async createPreference(
    @GetUser('id') currentUser: number,
    @Param('userId') userId: number,
    @Body() preferenceCreateDto: PreferenceCreateUpdateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: PreferenceResponseDto =
      await this.preferenceService.createPreference(
        currentUser,
        userId,
        preferenceCreateDto,
      );

    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'Preference saved successfully',
    });
  }

  @Patch('/userId')
  @UseGuards(SuperAdminGuard)
  async updatePreference(
    @GetUser('id') currentUser: number,
    @Param('userId') userId: number,
    @Body() preferenceUpdateDto: PreferenceCreateUpdateDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: PreferenceResponseDto =
      await this.preferenceService.updatePreference(
        currentUser,
        userId,
        preferenceUpdateDto,
      );

    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Preference updated successfully',
    });
  }

  @Get('/userId')
  @UseGuards(SuperAdminGuard)
  async getPreferenceByUserId(
    @GetUser('id') currentUser: number,
    @Param('userId') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: PreferenceResponseDto =
      await this.preferenceService.getPreferenceByUserId(currentUser, userId);

    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Preference found for user',
    });
  }

  @Get('/id')
  @UseGuards(UserGuard)
  async getPreferenceById(
    @GetUser('id') currentUser: number,
    @Param('id') preferenceId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: PreferenceResponseDto =
      await this.preferenceService.getPreferenceById(currentUser, preferenceId);

    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'Preference found for id',
    });
  }
}