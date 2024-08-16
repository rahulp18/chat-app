import { IsEmail, IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  fullname: string;
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
