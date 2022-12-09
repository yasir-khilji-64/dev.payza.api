import { IsEmail, IsOptional, Matches } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @Matches(/^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message:
      'Username field must contain uppercase, lowercase letter and a digit seperate with underscore or dot',
  })
  username?: string;
}
