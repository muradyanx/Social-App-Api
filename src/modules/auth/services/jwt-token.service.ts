import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  generateToken(jwtPayload) {
    return this.jwtService.sign(jwtPayload);
  }

  verifyToken(token) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('JWT_EMAIL_SECRET'),
    });
  }
}
