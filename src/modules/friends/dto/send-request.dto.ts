import { IsInt, IsNotEmpty } from 'class-validator';

export class SendRequestDto {
  @IsInt()
  @IsNotEmpty()
  receiverId: number;
}