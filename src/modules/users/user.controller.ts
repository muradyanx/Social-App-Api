import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser } from '@common/interface/request-with-user.interface';
import { UserService } from '@/modules/users/user.service';

@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  async getProfile(@Req() req: RequestWithUser) {
    const userData = await this.userService.getUserData(req.user.email);
    return {
      status: 'success',
      user: userData,
    };
  }

  @Get('search-users')
  async searchUsers(
    @Query('firstName') firstName?: string,
    @Query('lastName') lastName?: string,
    @Query('age') age?: number,
    @Query('limit') limit: number = 10,
    @Query('page') page: number = 0,
  ) {
    const usersData = await this.userService.searchUsers(
      limit,
      page,
      firstName,
      lastName,
      age,
    );
    return {
      status: 'success',
      data: usersData,
    };
  }
}
