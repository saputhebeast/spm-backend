import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { EditUserDto, UserResponseDto } from './dto';
import { UserService } from './user.service';
import { makeResponse } from '../common/util';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  async getMe(
    @GetUser('id') userId: number,
    @Res() res: Response,
  ): Promise<void> {
    const data: UserResponseDto = await this.userService.getMe(userId);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'User retrieved successfully',
    });
  }

  @Patch('edit')
  async editUser(
    @GetUser('id') userId: number,
    @Body() editUserDto: EditUserDto,
    @Res() res: Response,
  ): Promise<void> {
    const data: UserResponseDto = await this.userService.editUser(
      userId,
      editUserDto,
    );
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'User updated successfully',
    });
  }
}
