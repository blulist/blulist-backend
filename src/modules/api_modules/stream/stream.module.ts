import { Module } from '@nestjs/common';
import { StreamController } from './stream.controller';
import { StreamService } from './stream.service';
import { RedisModule } from '../../redis/redis.module';
import { TrackModule } from '../track/track.module';
import { PlaylistsModule } from '../playlists/playlists.module';

@Module({
  imports: [RedisModule, TrackModule, PlaylistsModule],
  providers: [StreamService],
  controllers: [StreamController],
})
export class StreamModule {}
