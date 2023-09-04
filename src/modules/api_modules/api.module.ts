import { Module } from '@nestjs/common';
import { PlaylistsModule } from './playlists/playlists.module';
import { TrackModule } from './track/track.module';

@Module({
  imports: [PlaylistsModule, TrackModule],
})
export class ApiModule {}
