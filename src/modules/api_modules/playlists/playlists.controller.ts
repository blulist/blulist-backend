import { Controller, Param, Query } from '@nestjs/common';
import {
  GetAllPlaylistsApi,
  GetPlaylistTracks,
} from './decorators/playlists-api.decorator';
import { PlaylistsService } from './playlists.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('🎶 Playlists')
@Controller('/playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}
  @GetAllPlaylistsApi()
  onGetAllPlaylists(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    if (limit > 30) limit = 10;
    return this.playlistsService.getAllPublicPlaylists(page, limit);
  }

  @GetPlaylistTracks()
  onGetPlaylistTracks(
    @Param('slug') slug: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    if (limit > 30) limit = 10;
    return this.playlistsService.getPlaylistTracks(slug, page, limit);
  }
}
