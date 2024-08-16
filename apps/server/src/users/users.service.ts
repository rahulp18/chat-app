import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(user: CreateUserDTO): Promise<User> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);

      const newUser = await this.prisma.user.create({
        data: {
          ...user,
          password: hashedPassword,
        },
      });
      return newUser;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('User with this email id already exists');
      } else {
        throw new InternalServerErrorException(
          'Internal Server error while creating user',
        );
      }
    }
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
  async findAll({ search = '' }: { search?: string }): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { fullname: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      },
    });
  }
  async findOtherUsers({
    search = '',
    userId,
  }: {
    search?: string;
    userId: string;
  }): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        OR: [
          { fullname: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
        id: {
          not: {
            equals: userId,
          },
        },
      },
    });
  }
  async getById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Password not matched');
    }
    return user;
  }
  async update(userId: string, updateUserDto: UpdateUserDTO): Promise<User> {
    try {
      const user = this.getById(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      let updateData = { ...updateUserDto };
      if (updateUserDto.password) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(updateUserDto.password, salt);
        updateData.password = hashedPassword;
      }
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...updateData,
        },
      });
      return updatedUser;
    } catch (error) {
      throw new InternalServerErrorException(
        'Internal Server error while creating user',
      );
    }
  }
}
