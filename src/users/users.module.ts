import { Module } from '@nestjs/common';

import { UsersService } from './services';
import { UsersController } from './controllers';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
