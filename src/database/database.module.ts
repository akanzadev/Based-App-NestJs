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
        const {
          mysql: { dbName, host, password, port, user, url },
          scope: { nodeEnv },
        } = configService;
        if (nodeEnv === 'development') {
          return {
            type: 'mysql',
            url,
            synchronize: false,
            logging: false,
            autoLoadEntities: true,
            ssl: { rejectUnauthorized: false },
          };
        } else {
          return {
            type: 'mysql',
            host,
            port,
            username: user,
            password,
            database: dbName,
            synchronize: false,
            logging: false,
            autoLoadEntities: true,
            ssl: false,
          };
        }
      },
    }),
    TypeOrmModule.forFeature([User, Role, RoleToUser]),
  ],
  exports: [TypeOrmModule],
  providers: [],
})
export class DatabaseModule {}
