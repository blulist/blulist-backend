import { Module } from '@nestjs/common';
import { PlaylistsModule } from './playlists/playlists.module';
import { TrackModule } from './track/track.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [PlaylistsModule, TrackModule, StreamModule],
})
export class ApiModule {}
