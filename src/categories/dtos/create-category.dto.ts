import {
  IsHexColor,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Matches,
} from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: "Name field can't be left empty" })
  @Matches(/^[a-zA-Z ]{3,30}$/, {
    message:
      'Name field must be at least 3 charaters and at max 30 character having uppercase and lowercase alphabets',
  })
  name: string;

  @IsOptional()
  @Matches(/^[a-zA-Z0-9 ]{0,}$/, {
    message: 'Description field should be alphanumeric string',
  })
  description?: string;

  @IsOptional()
  @IsHexColor({
    message: 'Color field only accepts a CSS Hex Color',
  })
  color: string;

  @IsUUID('4', {
    message: 'Category Type ID only accepts a UUID V4 type string',
  })
  category_type_id: string;
}
