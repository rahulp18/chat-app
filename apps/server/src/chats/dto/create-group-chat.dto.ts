import { IsArray, IsString } from 'class-validator';

export class CreateChatGroupDTO {
  @IsString()
  name: string;

  @IsArray()
  @IsString({ each: true })
  memberIds: string[];
}
