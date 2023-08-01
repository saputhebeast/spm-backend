import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getMe(@GetUser('id') userId: number) {
    return this.userService.getMe(userId);
  }

  @Patch('edit')
  editUser(@GetUser('id') userId: number, @Body() data: EditUserDto) {
    return this.userService.editUser(userId, data);
  }
}
