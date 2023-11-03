import { Controller, Get, Post, Body, UseGuards, SetMetadata } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegistrationDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { RolesGuard } from './guards/roles.guard';
import { UserRole } from './enum/roles.enum';
import { JwtAuthGuard } from 'src/auth/auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * 
   * @param registrationData sign up api for users
   * @returns 
   */
  @Post('register')
  async register(@Body() registrationData: RegistrationDto): Promise<User> {
    return await this.usersService.registerUser(registrationData);
  }


  /**
   * find all users api with authentication and authorization protected
   * @returns 
   */
  @SetMetadata('roles', [UserRole.ADMIN])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/fetchall')
  async fetchAll(): Promise<User[]> {
    try {
      return await this.usersService.findAllUser();
    } catch (error) {
      console.error('error, userController.fetchAll', error);
    }
  }
}
