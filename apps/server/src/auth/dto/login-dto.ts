import { IsEmail, IsString } from 'class-validator';

export class LogInDTO {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  password: string;
}
