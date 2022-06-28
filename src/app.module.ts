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
        MYSQL_USER: Joi.string().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        MYSQL_HOST: Joi.string().hostname().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_DATABASE: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
      }),
    }),
    AuthModule,
  ],
})
export class AppModule {}
