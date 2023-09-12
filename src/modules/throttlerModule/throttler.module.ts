import { Global, Module } from '@nestjs/common';
import {
  ThrottlerModule as _ThrottlerModule,
  ThrottlerGuard,
} from '@nestjs/throttler';
import { ThrottlerStorageRedisService } from 'nestjs-throttler-storage-redis';
import * as process from 'process';
import { APP_GUARD } from '@nestjs/core';

@Global()
@Module({
  imports: [
    _ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 10000,
          limit: 5,
        },
      ],
      storage: new ThrottlerStorageRedisService(process.env.REDIS_URL),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class ThrottlerModule {}
