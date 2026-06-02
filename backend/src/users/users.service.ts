import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  findUsers() {
    return this.userRepository.find();
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email, password },
    });
    if (!user) {
      throw new Error('Invalid email or password');
    }
    return user;
  }

  findUserById(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.update(id, updateUserDto);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
}
