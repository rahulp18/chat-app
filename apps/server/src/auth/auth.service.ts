import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { LogInDTO } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwt: JwtService,
  ) {}

  async register(
    dto: CreateUserDTO,
  ): Promise<{ message: string; access_token: string }> {
    const newUser = await this.usersService.create(dto);
    const payload = {
      sub: newUser.id,
    };
    const token = this.jwt.sign(payload);
    return {
      message: 'User registered successfully',
      access_token: token,
    };
  }
  async login(
    dto: LogInDTO,
  ): Promise<{ message: string; access_token: string }> {
    const validatedUser = await this.usersService.validateUser(
      dto.email,
      dto.password,
    );
    const payload = {
      sub: validatedUser.id,
    };
    const token = this.jwt.sign(payload);
    return {
      message: 'User logged in successfully',
      access_token: token,
    };
  }
}
