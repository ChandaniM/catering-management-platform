import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateAdmin(email: string, password: string) {
    const adminEmail = this.configService.get('ADMIN_EMAIL');
    const adminPasswordHash = this.configService.get('ADMIN_PASSWORD_HASH');

    if (email !== adminEmail) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { email, role: 'admin' };
  }

  async login(email: string, password: string) {
    const admin = await this.validateAdmin(email, password);

    const payload = { email: admin.email, sub: admin.email, role: admin.role };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        email: admin.email,
        role: admin.role,
      },
    };
  }
}
