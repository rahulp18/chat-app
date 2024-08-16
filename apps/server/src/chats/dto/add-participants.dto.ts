import { IsArray, IsString } from 'class-validator';

export class AddParticipantsDTO {
  @IsArray()
  @IsString({ each: true })
  memberIds: string[];
}
