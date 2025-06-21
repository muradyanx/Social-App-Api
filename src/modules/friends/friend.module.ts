import { Module } from '@nestjs/common';
import { FriendController } from '@/modules/friends/friend.controller';
import { FriendService } from '@/modules/friends/friend.service';
import { FriendRepository } from '@/modules/friends/friend.repository';
import { DatabaseModule } from '@database/database.module';
import { UserRepository } from '@/modules/users/user.repository';

@Module({
  imports: [],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository, UserRepository],
})
export class FriendModule {}