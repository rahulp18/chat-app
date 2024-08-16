import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll(@Query() query: { search?: string }) {
    return this.userService.findAll(query);
  }
  @Get('others')
  @UseGuards(JwtAuthGuard)
  getOtherUsers(@Query() query: { search?: string }, @Request() req) {
    const userId = req.user.id;
    return this.userService.findOtherUsers({ search: query.search, userId });
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getById(@Param() param: { id: string }) {
    return this.userService.getById(param.id);
  }
}
