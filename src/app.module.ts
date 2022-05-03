import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import config from 'src/config';
import { getEnvPath } from './common/helper/environments';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: getEnvPath(`${__dirname}/common/envs`),
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_HOST: Joi.string().hostname().required(),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
