import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(usernameInput: string, passwordInput: string) {
    const user = await this.usersService.findByUsername(usernameInput);
    if (!user) {
      throw new UnauthorizedException('Invalid credential');
    }

    const isMatch = await bcrypt.compare(passwordInput, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credential');
    }

    return instanceToPlain(user);
  }

  login(payload: { id: string; username: string }): { accessToken: string } {
    const token = this.jwtService.sign({
      sub: payload.id,
      username: payload.username,
    });

    return { accessToken: token };
  }
}
