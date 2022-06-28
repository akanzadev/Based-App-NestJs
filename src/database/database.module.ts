import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from 'src/config';
import { User, Role, RoleToUser } from './entities/users';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { dbName, host, password, port, user, url } = configService.mysql;
        const { nodeEnv } = configService.scope;
        // Connect with DATABASE_URL env variable
        return {
          type: 'mysql',
          url,
          synchronize: false,
          logging: false,
          autoLoadEntities: true,
          ssl: nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
        };
        /* return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          logging: false,
          autoLoadEntities: true,
        }; */
      },
    }),
    TypeOrmModule.forFeature([User, Role, RoleToUser]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class DatabaseModule {}
