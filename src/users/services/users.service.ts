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
    const phoneIsUnique = await this.phoneIsUnique(user.phone);
    if (!phoneIsUnique) throw new BadRequestException('Phone already in use');
    const newUser = this.userRepo.create(user);
    return this.userRepo.save(newUser);
  }

  private async emailIsUnique(email: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ email });
    return !user;
  }

  private async phoneIsUnique(phone: string): Promise<boolean> {
    const user = await this.userRepo.findOne({ phone });
    return !user;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  list(): Promise<User[]> {
    return this.userRepo.find();
  }
}
