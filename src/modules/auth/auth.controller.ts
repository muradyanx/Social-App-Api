import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { JWT_REFRESH_EXP } from '@/common/constants/token.constants';
import { Response } from 'express';
import { AuthService } from '@/modules/auth/services/auth.service';
import { JwtTokenService } from '@/modules/auth/services/jwt-token.service';
import { RegisterDto } from '@/modules/auth/dto/register.dto';
import { LoginDto } from '@/modules/auth/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}

  @Post('register')
  async register(@Body() userDto: RegisterDto, @Res() response: Response) {
    const securityStamp = uuid();
    const refreshTokenExp = JWT_REFRESH_EXP;
    const user = await this.authService.register(userDto, securityStamp);
    const jwtPayload = {
      id: user.id,
      email: user.email,
      role: user.role_id,
      securityStamp: securityStamp,
    };
    const accessToken = this.jwtTokenService.generateToken(jwtPayload);
    const refreshToken = this.jwtTokenService.generateToken({
      ...jwtPayload,
      refreshTokenExp,
    });
    this.authService.setHeaders(response, accessToken, refreshToken);
    console.log(accessToken);
    return response.status(HttpStatus.CREATED).json({
      message: 'User registered',
    });
  }

  @Post('login')
  async login(@Body() userDto: LoginDto, @Res() response: Response) {
    const securityStamp = uuid();
    const { accessToken, refreshToken } = await this.authService.login(
      userDto,
      securityStamp,
    );
    this.authService.setHeaders(response, accessToken, refreshToken);
    return response.status(HttpStatus.OK).json({
      message: 'User logged in',
    });
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string, @Res() response: Response) {
    const { email, securityStamp } = this.jwtTokenService.verifyToken(token);
    const { accessToken, refreshToken } = await this.authService.verifyEmail(
      email,
      securityStamp,
    );
    this.authService.setHeaders(response, accessToken, refreshToken);
    return response.status(HttpStatus.OK).json({
      message: 'Email verified',
    });
  }
}
