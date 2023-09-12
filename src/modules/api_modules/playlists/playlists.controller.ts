import { Controller, Param, Query, UseFilters } from '@nestjs/common';
import {
  GetAllPlaylistsApi,
  GetPlaylist,
  GetPlaylistTracks,
} from './decorators/playlists-api.decorator';
import { PlaylistsService } from './playlists.service';
import { ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../shared/filters/http-exception.filter';

@ApiTags('🎶 Playlists')
@UseFilters(HttpExceptionFilter)
@Controller('/playlists')
export class PlaylistsController {
  constructor(private playlistsService: PlaylistsService) {}
  @GetPlaylist()
  onGetPlaylist(@Param('slug') slug: string) {
    return this.playlistsService.getPlaylist(slug);
  }

  @GetAllPlaylistsApi()
  onGetAllPlaylists(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('sort') sort: string | null,
  ) {
    page = Number(page) || 1;
    limit = Number(limit) || 10;
    if (limit > 30) limit = 10;
    if (!['like', 'view'].includes(sort)) sort = null;

    return this.playlistsService.getAllPublicPlaylists(page, limit, sort);
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
