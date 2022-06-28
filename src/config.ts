import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    scope: {
      nodeEnv: process.env.NODE_ENV || 'development',
    },
    mysql: {
      dbName: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
      password: process.env.MYSQL_ROOT_PASSWORD,
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
      url: process.env.DATABASE_URL,
    },
    jwt: {
      expiration: process.env.ACCESS_TOKEN_EXPIRATION,
      secret: process.env.ACCESS_TOKEN_SECRET,
    },
  };
});
