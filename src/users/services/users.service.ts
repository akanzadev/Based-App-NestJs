import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '../../database/entities/users';
import { CloudinaryService } from './cloudinary.service';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
    private readonly authService: AuthService,
  ) {}

  async create(user: CreateUserDto) {
    await this.validateEmailUnique(user.email);
    await this.validatePhoneUnique(user.phone);
    const newUser = this.userRepo.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return {
      success: true,
      message: 'El registro se realizo correctamente',
      data: await this.userRepo.save(newUser),
    };
  }

  async createWithImage(
    user: CreateUserDto,
    files: Array<Express.Multer.File>,
  ) {
    if (files.length === 0) throw new BadRequestException('No image uploaded');
    await this.validateEmailUnique(user.email);
    await this.validatePhoneUnique(user.phone);
    const newUser = this.userRepo.create(user);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    // Se creo el usuario correctamente
    // Ahora guardaremos la imagen y se la asignaremos al usuario
    const { secure_url } = await this.cloudinaryService.uploadImage(
      user.email,
      files[0],
    );
    newUser.image = secure_url;
    const rta = await this.userRepo.save(newUser);
    return await this.authService.generateJwtToken(rta);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findAll() {
    const users = await this.userRepo.find();
    if (users.length === 0) throw new NotFoundException('No users found');
    return users;
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.validateNotFound(id);
    if (changes.email) await this.validateEmailUnique(changes.email);
    if (changes.phone) await this.validatePhoneUnique(changes.phone);
    await this.userRepo.merge(user, changes);
    return this.userRepo.save(user);
  }

  async remove(id: number) {
    const user = await this.validateNotFound(id);
    await this.userRepo.remove(user);
    return {
      message: `User #${id} deleted`,
    };
  }

  private async validateNotFound(id: number) {
    const user = await this.userRepo.findOne(id);
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  private async validateEmailUnique(email: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (user) throw new BadRequestException(`${email} is already registered`);
  }

  private async validatePhoneUnique(phone: string) {
    const user = await this.userRepo.findOne({ where: { phone } });
    if (user) throw new BadRequestException(`${phone} is already registered`);
  }
}
