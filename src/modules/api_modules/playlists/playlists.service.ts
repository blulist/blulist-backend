import {
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PlaylistsRepository } from './playlists.repository';
import { ResponseFormat } from '../shared/interfaces/response.interface';
import { Playlist } from './interfaces/playlists.interface';
import { TrackRepository } from '../track/track.repository';
import { Track } from '../track/interfaces/track.interface';

@Injectable()
export class PlaylistsService {
  constructor(
    private playlistRepo: PlaylistsRepository,
    private trackRepo: TrackRepository,
  ) {}

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
  async getPlaylistTracks(
    slug: string,
    page: number,
    limit: number,
  ): Promise<ResponseFormat<any>> {
    const playlist: Playlist | null =
      await this.playlistRepo.findOneBySlug(slug);
    if (!playlist) throw new NotFoundException('پلی لیست یافت نشد');

    const tracksDB = await this.trackRepo.findTracksByPlaylistId(
      playlist.id,
      page,
      limit,
    );
    const tracks = tracksDB.map((track: Track) => {
      delete track.addedById;
      // return track;
      return {
        uniqueId: track.uniqueId,
        title: track.title,
        performer: track.performer,
        duration: track.duration,
        isHaveThumbnail: !!track.thumbnail,
      };
    });
    return {
      statusCode: HttpStatus.OK,
      data: tracks,
    };
  }
}
