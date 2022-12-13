import {
  IsAlphanumeric,
  IsNotEmpty,
  IsOptional,
  Matches,
} from 'class-validator';

export class CreateCategoryTypeDto {
  @IsNotEmpty({ message: "Name field can't be left empty" })
  @Matches(/^[a-zA-Z ]{3,30}$/, {
    message:
      'Name field must be at least 3 charaters and at max 30 character having uppercase and lowercase alphabets',
  })
  name: string;

  @IsOptional()
  @IsAlphanumeric()
  description?: string;
}
