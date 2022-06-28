import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { PayloadToken, RoleEnum } from '../models';
import { User, Role } from '../../database/entities/users';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Role) private rolesRepo: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) throw new UnauthorizedException('Invalid credentials');
    return user;
  }

  async generateJwtToken(userData: User) {
    const user = await this.validateEmail(userData.email);
    const payload: PayloadToken = { role: 'role.name', sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    delete user.password;
    return {
      success: true,
      message: 'El usuario fue autenticado',
      data: {
        ...user,
        session_token: accessToken,
      },
    };
  }

  async validateEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: { email },
    });
    if (user) return user;
    return null;
  }

  async validateRoleInUser(user: PayloadToken, roles: RoleEnum[]) {
    return true;
  }
}
