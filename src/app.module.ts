import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import config from 'src/config';
import { getEnvPath } from './common/helper/environments';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/common/envs`),
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000).required(),
        MYSQL_USER: Joi.string(),
        MYSQL_ROOT_PASSWORD: Joi.string(),
        MYSQL_HOST: Joi.string().hostname(),
        MYSQL_PORT: Joi.number(),
        MYSQL_DATABASE: Joi.string(),
        DATABASE_URL: Joi.string(),
        NODE_ENV: Joi.string().valid('development', 'production'),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        CLOUDINARY_CLOUD_NAME: Joi.string().required(),
        CLOUDINARY_API_KEY: Joi.string().required(),
        CLOUDINARY_API_SECRET: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
