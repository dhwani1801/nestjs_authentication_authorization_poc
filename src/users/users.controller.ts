import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegistrationDto, LoginDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('register')
  async register(@Body() registrationData: RegistrationDto): Promise<User> {
    return await this.usersService.registerUser(registrationData);
  }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    return this.usersService.loginUser(loginData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/fetchall')
  async fetchAll(): Promise<User[]> {
    try {
      return await this.usersService.findAllUser();
    } catch (error) {
      console.error('error, userController.fetchAll', error);
    }
  }
}
