import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RoleRepository } from '@/modules/auth/repositories/role.repository';
import { DatabaseModule } from '@database/database.module';
import { JwtTokenService } from '@/modules/auth/services/jwt-token.service';
import { AuthService } from '@/modules/auth/services/auth.service';
import { AuthRepository } from '@/modules/auth/repositories/auth.repository';
import { AuthController } from '@/modules/auth/auth.controller';
import { MailModule } from '@/modules/mail/mail.module';
import { UserRepository } from '@/modules/users/user.repository';
import { JwtStrategy } from '@common/strategy/jwt-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION },
    }),
    PassportModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtTokenService,
    AuthRepository,
    RoleRepository,
    UserRepository,
    JwtStrategy,
  ],
  exports: [
    AuthService,
    JwtTokenService,
    AuthRepository,
    RoleRepository,
    PassportModule,
  ],
})
export class AuthModule {}
