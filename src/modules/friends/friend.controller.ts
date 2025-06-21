import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SendRequestDto } from '@/modules/friends/dto/send-request.dto';
import { RequestWithUser } from '@common/interface/request-with-user.interface';
import { FriendService } from '@/modules/friends/friend.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestStatusDto } from '@/modules/friends/dto/request-status.dto';
import { RequestAction } from '@common/enum/request-status.enum';

@UseGuards(AuthGuard('jwt'))
@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('send-request')
  async sendFriendRequest(
    @Body() requestDto: SendRequestDto,
    @Req() req: RequestWithUser,
  ) {
    const { receiverId } = requestDto;
    const senderId = req.user.id;
    await this.friendService.sendFriendRequest(senderId, receiverId);
    return {
      status: 'success',
      message: 'Request sent',
    };
  }

  @Get('get-requests')
  async getRequestsList(@Req() req: RequestWithUser) {
    const user = req.user.id;
    const requests = await this.friendService.getFriendRequests(user);
    return {
      status: 'success',
      data: requests,
    };
  }

  @Patch(':id/status')
  async updateRequestStatus(
    @Req() req: RequestWithUser,
    @Param('id') id: number,
    @Body() statusDto: RequestStatusDto,
  ) {
    const { status } = statusDto;
    const receiver = req.user.id;
    if (!Object.values(RequestAction).includes(status as RequestAction)) {
      throw new BadRequestException('Invalid status');
    }
    await this.friendService.updateRequestStatus(id, receiver, status);
    return {
      status: 'success',
      message: 'Friend request status updated',
    };
  }
}
