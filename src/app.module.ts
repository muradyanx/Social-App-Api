import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthModule } from '@/modules/auth/auth.module';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from '@/modules/users/user.module';
import { UserController } from '@/modules/users/user.controller';
import { FriendModule } from '@/modules/friends/friend.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    UserModule,
    FriendModule,
  ],
  controllers: [AuthController, UserController],
  providers: [],
})
export class AppModule {}
