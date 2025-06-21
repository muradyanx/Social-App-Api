import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from '../repositories/auth.repository';
import { RegisterDto } from '../dto/register.dto';
import { hashPassword, comparePassword } from '@common/utils/hash-password';
import { RolesEnum } from '@/common/enum/roles.enum';
import { RoleRepository } from '@/modules/auth/repositories/role.repository';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { Response } from 'express';
import { JwtTokenService } from '@/modules/auth/services/jwt-token.service';
import { JWT_REFRESH_EXP } from '@common/constants/token.constants';
import { MailService } from '@/modules/mail/mail.service';
import { v4 as uuid } from 'uuid';
import { UserRepository } from '@/modules/users/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly mailService: MailService,
  ) {}

  async register(userData: RegisterDto, securityStamp: string) {
    const { password, email } = userData;
    const user = await this.userRepository.findUserByEmail(email);
    if (user) {
      throw new BadRequestException('Email already in use');
    }
    const role = await this.roleRepository.findRoleByName(RolesEnum.USER);
    const passwordHash = await hashPassword(password);
    const token = this.jwtTokenService.generateToken({
      email: email,
      securityStamp: securityStamp,
      expiresIn: '10m',
    });
    await this.mailService.sendMailVerification(email, token);
    await this.authRepository.createUser(
      userData,
      passwordHash,
      role.id,
      securityStamp,
    );
    return await this.userRepository.findUserByEmail(email);
  }

  async login(userData: LoginDto, securityStamp: string) {
    const { password, email } = userData;
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role_id,
      securityStamp: securityStamp,
    };
    const accessToken = this.jwtTokenService.generateToken(jwtPayload);
    const refreshToken = this.jwtTokenService.generateToken({
      ...jwtPayload,
      JWT_REFRESH_EXP,
    });
    return { accessToken, refreshToken };
  }

  async verifyEmail(email: string, securityStamp: string) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.security_stamp !== securityStamp) {
      throw new BadRequestException('Invalid token');
    }
    const securityStampUpdated = uuid();
    await this.authRepository.updateSecurityStamp(email, securityStampUpdated);
    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role_id,
      securityStamp: securityStamp,
    };
    const accessToken = this.jwtTokenService.generateToken(jwtPayload);
    const refreshToken = this.jwtTokenService.generateToken({
      ...jwtPayload,
      JWT_REFRESH_EXP,
    });
    return { accessToken, refreshToken };
  }

  public setHeaders(res: Response, accessToken: string, refreshToken: string) {
    res.setHeader('Access-token', `Bearer ${accessToken}`);
    res.setHeader('Refresh-token', `Bearer ${refreshToken}`);
  }
}
