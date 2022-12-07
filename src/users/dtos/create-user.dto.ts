import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';
import { UserRoles } from '../entities/user-roles.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: "Email field can't be empty" })
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: "Username field can't be empty" })
  @Matches(/^(?=[a-zA-Z0-9._]{3,30}$)(?!.*[_.]{2})[^_.].*[^_.]$/, {
    message:
      'Username field must contain uppercase, lowercase letter and a digit seperate with underscore or dot',
  })
  username: string;

  @IsNotEmpty({ message: "Password field can't be empty" })
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
    message:
      'Password fieldshould be atleast 8 characters long with uppercase, lowercase letter, digits and a special character',
  })
  password: string;

  @IsOptional()
  @IsEnum(UserRoles, {
    message: 'Role can only be either USER or ADMIN',
  })
  role?: UserRoles;
}
