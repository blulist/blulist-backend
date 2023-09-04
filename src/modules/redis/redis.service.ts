import { Injectable } from '@nestjs/common';
import { RedisService as RedisService_ } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';

@Injectable()
export class RedisService extends Redis {
  constructor(private readonly redisService: RedisService_) {
    super(redisService.getClient().options);
  }
}
