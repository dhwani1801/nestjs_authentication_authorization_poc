import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegistrationDto, LoginDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  async registerUser(registrationData: RegistrationDto): Promise<User> {
    const user = this.userRepository.create(registrationData);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hashSync(user.password, salt);
    return await this.userRepository.save(user);
  }

  async loginUser(loginData: LoginDto) {
    const { email, password } = loginData;

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return { access_token: accessToken };
  }


  async findByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ where: { email: email } });
  }

  async comparePassword(password: string, hash) {
    return await bcrypt.compare(password, hash)
}

  async findAllUser(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }
}

