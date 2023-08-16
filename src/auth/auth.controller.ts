import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, AuthSignDto, TokenDto } from './dto';
import { makeResponse } from '../common/util';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() dto: AuthDto, @Res() res: Response): Promise<void> {
    const data: TokenDto = await this.authService.signup(dto);
    return makeResponse({
      res,
      status: HttpStatus.CREATED,
      data,
      message: 'User created successfully',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signin(@Body() dto: AuthSignDto, @Res() res: Response): Promise<void> {
    const data: TokenDto = await this.authService.signin(dto);
    return makeResponse({
      res,
      status: HttpStatus.OK,
      data,
      message: 'User logged in successfully',
    });
  }
}
