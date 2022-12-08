import { createHash } from 'crypto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  private generateAvatarUrl(email: string): string {
    const baseUrl = 'https://avatars.dicebear.com/api/bottts';
    const query = 'svg';
    const hash = createHash('md5').update(email.toLowerCase()).digest('hex');
    return `${baseUrl}/${hash}.${query}`;
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
  }

  async getById(id: string) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this email does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async create(userDetials: CreateUserDto): Promise<User> {
    const avatarUrl = this.generateAvatarUrl(userDetials.email);
    const newUser = await this.usersRepository.create({
      ...userDetials,
      avatar_url: avatarUrl,
    });
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async updateLastLogin(id: string) {
    const lastLoginDate = new Date().toISOString();
    const updateResult = await this.usersRepository
      .createQueryBuilder('user')
      .update()
      .set({ last_login: lastLoginDate })
      .where('id = :id', { id: id })
      .execute();

    if (updateResult.affected >= 1) {
      return await this.usersRepository.findOne({ where: { id: id } });
    }
  }
}
