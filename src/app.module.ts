import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { RedisModule } from './modules/redis/redis.module';
import { ConfigModule } from '@nestjs/config';
import { ApiModule } from './modules/api_modules/api.module';
import { LoggingModule } from './modules/logging/logging.module';
import { DiscordLogger } from './modules/logging/loggers/discord.logger';

@Module({
  imports: [
    PrismaModule,
    RedisModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggingModule.register(new DiscordLogger()),
    ApiModule,
  ],
})
export class AppModule {}
