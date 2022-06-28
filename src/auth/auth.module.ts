import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ConfigType } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './controllers/auth.controller';
import config from 'src/config';
import { AuthService } from './services/auth.service';
import { LocalStrategy, JwtStrategy } from './strategies';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => ({
        secret: configService.jwt.secret,
        signOptions: { expiresIn: configService.jwt.expiration },
      }),
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
