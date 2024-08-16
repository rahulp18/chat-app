import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMessageDTO } from './dto/create-messages.dto';
import { UpdateMessageDTO } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messageService: MessagesService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createMessageDto: CreateMessageDTO) {
    const senderId = req.user.id;

    return this.messageService.create(
      senderId,
      createMessageDto.chatId,
      createMessageDto.content,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get('chat/:chatId')
  findAllByChatId(@Param() param) {
    return this.messageService.getAllMessages(param.chatId);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param() param, @Body() updateMessageDto: UpdateMessageDTO) {
    const messageId = param.id;
    return this.messageService.updateMessage(
      messageId,
      updateMessageDto.content,
    );
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param() param) {
    const messageId = param.id;
    return this.messageService.deleteMessage(messageId);
  }
  @UseGuards(JwtAuthGuard)
  @Post('read/:chatId')
  markAsRead(@Param() param, @Request() req) {
    const chatId = param.chatId;
    const userId = req.user.id;
    return this.messageService.markMessageAsRead(userId, chatId);
  }
}
