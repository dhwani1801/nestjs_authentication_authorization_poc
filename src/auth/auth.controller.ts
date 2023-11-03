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
        return this.authService.login(loginData);
    }
}