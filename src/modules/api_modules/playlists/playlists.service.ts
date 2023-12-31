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

@Injectable()
export class PlaylistsService {
  constructor(
    private playlistRepo: PlaylistsRepository,
    private trackRepo: TrackRepository,
  ) {}

  async getPlaylist(slug: string): Promise<ResponseFormat<any>> {
    const playlist = await this.playlistRepo.findOneBySlug(
      slug,
      PlaylistOutTypeEnum.WithCounts,
    );
    if (!playlist) throw new NotFoundException('پلی لیست یافت نشد');

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
