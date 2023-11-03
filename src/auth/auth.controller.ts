import { AuthService } from './auth.service';
import { Controller, Body, Post } from '@nestjs/common';

import { LoginDto } from 'src/users/dto/create-user.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    /**
     * login api to generatre jwt token
     * @param loginData 
     * @returns 
     */
    @Post('/login')
    async login(@Body() loginData: LoginDto) {
      try
      {
        return this.authService.login(loginData);
      }
      catch(error)
      {
        console.error('error, authController.register', error);
        throw error ;
      }

    }
}