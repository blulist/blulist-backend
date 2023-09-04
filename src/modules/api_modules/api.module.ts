import { Module } from '@nestjs/common';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [PlaylistsModule],
})
export class ApiModule {}
