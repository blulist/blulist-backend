import { Controller, Query } from '@nestjs/common';
import { getAllPlaylistsApi } from './decorators/playlists-api.decorator';
import { PlaylistsService } from './playlists.service';

@Controller('/playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}
  @getAllPlaylistsApi()
  onGetAllPlaylists(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    if (limit > 30) limit = 10;
    return this.playlistsService.getAllPublicPlaylists(page, limit);
  }
}
