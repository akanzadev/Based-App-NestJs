import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBody } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { LoginAuthDto } from '../dtos/auth.dto';
import { User } from '../../database/entities/users';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('local'))
  @ApiBody({ type: LoginAuthDto })
  login(@Req() req: Request) {
    return this.authService.generateJwtToken(req.user as User);
  }
}
