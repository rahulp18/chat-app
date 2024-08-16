import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateChatGroupDTO } from './dto/create-group-chat.dto';
import { ChatsService } from './chats.service';
import { AddParticipantsDTO } from './dto/add-participants.dto';

@Controller('chats')
export class ChatsController {
  constructor(private chatService: ChatsService) {}
  @Post('direct')
  @UseGuards(JwtAuthGuard)
  async createDirectChat(
    @Request() req,
    @Body() body: { recipientId: string },
  ) {
    const userId = req.user.id;
    return this.chatService.createDirectChat(userId, body.recipientId);
  }
  @Post('group')
  @UseGuards(JwtAuthGuard)
  createGroup(@Request() req, @Body() body: CreateChatGroupDTO) {
    const creatorId = req.user.id;
    return this.chatService.createGroupChat(
      body.name,
      creatorId,
      body.memberIds,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Post(':chatId/participants')
  addParticipants(
    @Param() { chatId }: { chatId: string },
    @Body() addParticipantDTO: AddParticipantsDTO,
  ) {
    return this.chatService.addParticipants(
      chatId,
      addParticipantDTO.memberIds,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get(':chatId/participants')
  getParticipants(@Param() param: { chatId: string }) {
    return this.chatService.getChatParticipants(param.chatId);
  }
  @UseGuards(JwtAuthGuard)
  @Get('')
  getUserChats(@Request() req, @Query() query: { search?: string }) {
    const userId = req.user.id;
    return this.chatService.getUserChats({ userId, search: query.search });
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getChatById(@Param() param: { id: string }) {
    return this.chatService.getChatInformation(param.id);
  }
}
