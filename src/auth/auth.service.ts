import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findByEmail(email);
    if (user && (await this.userService.comparePassword(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * login function which will generate j token
   * @param loginDto 
   * @returns 
   */
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    console.log('userrrr   : ', user)
    const payload = { email: user.email, sub: user.id };
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      access_token: this.jwtService.sign(payload),
    };
  }
}

