import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RegistrationDto, LoginDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async registerUser(registrationData: RegistrationDto): Promise<User> {
    const user = this.userRepository.create(registrationData);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hashSync(user.password, salt);
    return await this.userRepository.save(user);
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

