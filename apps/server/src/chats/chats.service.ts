import { Injectable, NotFoundException } from '@nestjs/common';
import { Chat, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChatsService {
  constructor(private prisma: PrismaService) {}
  async createDirectChat(user1: string, user2: string): Promise<Chat> {
    let chat = await this.prisma.chat.findFirst({
      where: {
        isGroup: false,
        participants: {
          every: {
            userId: {
              in: [user1, user2],
            },
          },
        },
      },
    });
    if (!chat) {
      chat = await this.prisma.chat.create({
        data: {
          isGroup: false,
          participants: {
            create: [{ userId: user1 }, { userId: user2 }],
          },
        },
      });
    }
    return chat;
  }
  async createGroupChat(
    name: string,
    creatorId: string,
    memberIds: string[],
  ): Promise<Chat> {
    const participants = memberIds.map((userId) => ({ userId }));
    return this.prisma.chat.create({
      data: {
        name,
        isGroup: true,
        participants: {
          create: [{ userId: creatorId }, ...participants],
        },
      },
    });
  }
  async addParticipants(chatId: string, userIds: string[]): Promise<void> {
    const participants = userIds.map((userId) => ({ userId, chatId }));
    await this.prisma.chatParticipant.createMany({
      data: participants,
      skipDuplicates: true,
    });
  }
  async getChatParticipants(chatId: string): Promise<User[]> {
    const participants = await this.prisma.chatParticipant.findMany({
      where: {
        chatId,
      },
      include: {
        user: true,
      },
    });
    return participants.map((p) => p.user);
  }
  async getUserChats({
    userId,
    search,
  }: {
    search?: string;
    userId: string;
  }): Promise<Chat[]> {
    return this.prisma.chat.findMany({
      where: {
        participants: {
          some: {
            userId,
          },
        },
        AND: search
          ? {
              OR: [
                {
                  name: {
                    contains: search,
                    mode: 'insensitive', // Case-insensitive search
                  },
                },
                {
                  participants: {
                    some: {
                      user: {
                        fullname: {
                          contains: search,
                          mode: 'insensitive', // Case-insensitive search
                        },
                      },
                    },
                  },
                },
              ],
            }
          : {},
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
        messages: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }
  async getChatInformation(chatId: string) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        participants: {
          include: {
            user: true,
          },
        },
      },
    });

    return chat;
  }

  async deleteDirectChat({
    chatId,
    userId,
  }: {
    chatId: string;
    userId: string;
  }) {
    console.log(chatId);
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        participants: true,
      },
    });
    if (!chat || chat.participants.length > 2) {
      throw new NotFoundException('Invalid chat id || chat not found');
    }
    await this.prisma.chat.delete({
      where: {
        id: chatId,
      },
    });

    return { message: 'Chat deleted successfully' };
  }
  async leaveGroupChat({ chatId, userId }: { chatId: string; userId: string }) {
    const chat = await this.prisma.chat.findUnique({
      where: {
        id: chatId,
      },
      include: {
        participants: true,
      },
    });
    if (!chat) {
      throw new NotFoundException('Invalid chat id || chat not found');
    }
    await this.prisma.chatParticipant.delete({
      where: {
        userId_chatId: {
          userId,
          chatId,
        },
      },
    });
    const participants = await this.prisma.chatParticipant.findMany({
      where: {
        chatId: {
          equals: chatId,
        },
      },
    });
    if (participants.length === 0) {
      await this.prisma.chat.delete({
        where: {
          id: chatId,
        },
      });
    }

    return { message: 'Successfully left the chat' };
  }
}
