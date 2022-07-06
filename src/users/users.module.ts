import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

import { UsersService, RolesService } from './services';
import { UsersController } from './controllers';
import { AuthModule } from '../auth/auth.module';
import config from 'src/config';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryService } from './services/cloudinary.service';

@Module({
  imports: [AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    RolesService,
    CloudinaryService,
    {
      provide: 'Cloudinary',
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { api_key, api_secret, cloud_name } =
          configService.storage.cloudinary;
        return cloudinary.config({
          cloud_name,
          api_key,
          api_secret,
        });
      },
    },
  ],
})
export class UsersModule {}
