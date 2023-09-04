import * as process from 'process';

const configs = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: String(process.env.DATABASE_URL),
  REDIS_URL: String(process.env.REDIS_URL),
  APP_MODE: String(process.env.APP_MODE),
  JWT_SECRET: String(process.env.JWT_SECRET),
  TELETEGRAM_SERVICE: String(process.env.TELETEGRAM_SERVICE),
};

export type Configs = typeof configs;
export default (): Configs => configs;
