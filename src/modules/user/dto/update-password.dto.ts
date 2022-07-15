import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @Length(8)
  @IsNotEmpty()
  oldPassword: string;

  @Length(8)
  @IsNotEmpty()
  newPassword: string;
}
