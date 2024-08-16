import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async create(
    senderId: string,
    chatId: string,
    content: string,
  ): Promise<Message> {
    return this.prisma.message.create({
      data: {
        content,
        chatId,
        senderId,
      },
    });
  }

  async getAllMessages(chatId: string): Promise<Message[]> {
    return this.prisma.message.findMany({
      where: {
        chatId,
      },
      orderBy: { createdAt: 'asc' },
    });
  }
  async updateMessage(messageId: string, content: string): Promise<Message> {
    const message = await this.prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        content,
        updatedAt: new Date(),
      },
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }

    return message;
  }

  async deleteMessage(messageId: string): Promise<Message> {
    const message = await this.prisma.message.delete({
      where: {
        id: messageId,
      },
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${messageId} not found`);
    }

    return message;
  }

  async markMessageAsRead(userId: string, chatId: string): Promise<void> {
    await this.prisma.chatParticipant.updateMany({
      where: {
        userId,
        chatId,
      },
      data: {
        lastReadAt: new Date(),
      },
    });
  }
}
