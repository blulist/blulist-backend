import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PlaylistsRepository } from './playlists.repository';
import { ResponseFormat } from '../shared/interfaces/response.interface';
import {
  Playlist,
  PlaylistOutTypeEnum,
  PlaylistWithCounts,
} from './interfaces/playlists.interface';
import { TrackRepository } from '../track/track.repository';
import { Track } from '../track/interfaces/track.interface';
import { RedisService } from '../../redis/redis.service';
import { isIPv4 } from 'net';
@Injectable()
export class PlaylistsService {
  constructor(
    private playlistRepo: PlaylistsRepository,
    private trackRepo: TrackRepository,
    private redisService: RedisService,
  ) {}

  async getPlaylist(
    slug: string,
    ip: string | null,
  ): Promise<ResponseFormat<any>> {
    const playlist = await this.playlistRepo.findOneBySlug(
      slug,
      PlaylistOutTypeEnum.WithCounts,
    );
    if (!playlist) throw new NotFoundException('پلی لیست یافت نشد');
    if (ip && isIPv4(ip)) {
      const viewKey = `blu:view:p_slug_${playlist.slug}:ip_${ip}`;
      const hasView = await this.redisService.get(viewKey);
      if (!hasView) {
        await this.playlistRepo.updateViewCount(playlist.slug);
        await this.redisService.setex(viewKey, 60 * 30, '1'); // save for 30min
        playlist.viewCount++;
      }
    }
    return {
      statusCode: HttpStatus.OK,
      data: {
        slug: playlist.slug,
        name: playlist.name,
        isHaveBanner: !!playlist.bannerId,
        viewCount: playlist.viewCount,
        createdAt: playlist.createdAt,
        tracksCount: playlist._count.Track,
        likesCount: playlist._count.Like,
      },
    };
  }

  async getAllPublicPlaylists(
    page: number,
    limit: number,
    sort: string | null,
  ): Promise<ResponseFormat<any>> {
    const playlistsDB: PlaylistWithCounts[] = await this.playlistRepo.findAll(
      false,
      page,
      limit,
      sort,
      PlaylistOutTypeEnum.WithCounts,
    );
    const totalCount = await this.playlistRepo.getPublicTotalCount();
    const totalPages = Math.ceil(totalCount / limit);

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;

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
      data: {
        playlists,
        hasNextPage,
        hasPrevPage,
        nextPage,
        playlistsCount: totalCount,
      },
    };
  }
  async getPlaylistTracks(
    slug: string,
    page: number,
    limit: number,
  ): Promise<ResponseFormat<any>> {
    const playlist: Playlist | null = await this.playlistRepo.findOneBySlug(
      slug,
      PlaylistOutTypeEnum.WithCounts,
    );
    if (!playlist) throw new NotFoundException('پلی لیست یافت نشد');

    const tracksDB = await this.trackRepo.findTracksByPlaylistId(
      playlist.id,
      page,
      limit,
    );

    const totalCount = await this.trackRepo.getPublicTotalCount(playlist.id);
    const totalPages = Math.ceil(totalCount / limit);

    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    const nextPage = hasNextPage ? page + 1 : null;

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
      data: {
        tracks,
        tracksCount: totalCount,
        hasNextPage,
        hasPrevPage,
        nextPage,
      },
    };
  }
}
