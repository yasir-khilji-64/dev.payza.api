import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Req() request: RequestWithUser) {
    const { user } = request;
    return instanceToPlain(user);
  }

  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  @Get()
  async getUsers() {
    const user = await this.usersService.getAllUsers();
    return instanceToPlain(user);
  }
}
