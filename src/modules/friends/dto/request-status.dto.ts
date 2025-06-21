import { IsEnum, IsNotEmpty } from 'class-validator';
import { RequestAction } from '@common/enum/request-status.enum';

export class RequestStatusDto {
  @IsEnum({ enum: RequestAction })
  @IsNotEmpty()
  status: RequestAction.ACCEPT;
}