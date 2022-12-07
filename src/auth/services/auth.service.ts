import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { RegisterUserDto } from '../dtos/register-user.dto';
import { PostgresErrorCodes } from 'src/database/postgres-error-codes.enum';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  public async register(registerDetails: RegisterUserDto): Promise<User> {
    try {
      const hashedPassword = await this.hashPassword(registerDetails.password);
      const user = await this.usersService.create({
        ...registerDetails,
        password: hashedPassword,
      });
      return user;
    } catch (error) {
      if (error?.code === PostgresErrorCodes.UniqueViolation) {
        throw new HttpException(
          'User already exist with this email',
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        'Fatal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public getCookieWithJwtToken(id: string, role: string): string {
    const payload: TokenPayload = { id: id, role: role };
    const token = this.jwtService.sign(payload, { subject: id });
    return `Auth=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }
}
