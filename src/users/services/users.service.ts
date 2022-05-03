import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(user: CreateUserDto) {
    const emailIsUnique = await this.emailIsUnique(user.email);
    if (!emailIsUnique) throw new BadRequestException('Email already exists');
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  private async emailIsUnique(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ email });
    return !user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }
}
