import { Module } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { PlaylistsRepository } from './playlists.repository';
import { PlaylistsController } from './playlists.controller';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [TrackModule],
  providers: [PlaylistsService, PlaylistsRepository],
  controllers: [PlaylistsController],
  exports: [PlaylistsRepository],
})
export class PlaylistsModule {}
