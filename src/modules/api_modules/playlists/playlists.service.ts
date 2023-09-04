import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { PlaylistsRepository } from './playlists.repository';
import { ResponseFormat } from '../shared/interfaces/response.interface';

@Injectable()
export class PlaylistsService {
  constructor(private playlistRepo: PlaylistsRepository) {}

  async getAllPublicPlaylists(
    page: number,
    limit: number,
  ): Promise<ResponseFormat<any>> {
    const playlistsDB = await this.playlistRepo.findAll(false, page, limit);
    const playlists = playlistsDB.map((pl) => {
      return {
        slug: pl.slug,
        name: pl.name,
        isHaveBanner: !!pl.bannerId,
        viewCount: pl.viewCount,
        createdAt: pl.createdAt,
        tracksCount: pl._count.Track,
        likesCount: pl._count.Like,
      };
    });
    return {
      statusCode: HttpStatus.OK,
      data: playlists,
    };
  }
}
