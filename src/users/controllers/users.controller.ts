import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { AdminRoleGuard } from 'src/auth/guards/admin-role.guard';
import { AdminUserDeleteGuard } from 'src/auth/guards/admin-user-delete.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserIdGuard } from 'src/auth/guards/user-id.guard';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { UpdateUserDto } from '../dtos/update-user.dto';
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

  @UseGuards(JwtAuthGuard, UserIdGuard)
  @Patch(':id')
  async updateUser(
    @Body() updateDetails: UpdateUserDto,
    @Param('id') id: string,
  ) {
    const updateUser = await this.usersService.updateUserDetails(
      id,
      updateDetails,
    );
    return instanceToPlain(updateUser);
  }

  @UseGuards(JwtAuthGuard, AdminUserDeleteGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
