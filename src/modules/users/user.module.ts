import { Module } from '@nestjs/common';
import { UserRepository } from '@/modules/users/user.repository';
import { AuthModule } from '@/modules/auth/auth.module';
import { UserService } from '@/modules/users/user.service';
import { DatabaseModule } from '@database/database.module';
import { UserController } from '@/modules/users/user.controller';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository, UserService],
})
export class UserModule {}
