import { Body, Controller, HttpCode, Post, Res } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Response } from 'express';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(201)
  @Post('register')
  async register(
    @Body() registerDetails: RegisterUserDto,
    @Res() response: Response,
  ) {
    const user = await this.authService.register(registerDetails);
    const cookie = this.authService.getCookieWithJwtToken(user.id, user.role);
    response.setHeader('Set-Cookie', cookie);
    return response.send(instanceToPlain(user));
  }
}
