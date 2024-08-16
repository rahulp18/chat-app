import { IsString } from 'class-validator';

export class CreateMessageDTO {
  @IsString()
  chatId: string;
  @IsString()
  content: string;
}
