import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { RedisService } from '../../redis/redis.service';
import { TrackRepository } from '../track/track.repository';
import { PlaylistsRepository } from '../playlists/playlists.repository';
import {
  Playlist,
  PlaylistOutTypeEnum,
} from '../playlists/interfaces/playlists.interface';
import { getFileLink } from '../shared/api/getFileUrl.api';
import { ConfigService } from '@nestjs/config';
import { Configs } from '../../../config/configuration';
import { streamFileApi } from '../shared/api/stream.api';
import { Track } from '../track/interfaces/track.interface';
import { Request, Response } from 'express';

@Injectable()
export class StreamService {
  constructor(
    private redisService: RedisService,
    private trackRepo: TrackRepository,
    private playlistRepo: PlaylistsRepository,
    private configService: ConfigService<Configs>,
  ) {}

  async playlistBanner(slug: string) {
    let playlist: string | Playlist | null = await this.redisService.get(
      `blu:playlist:${slug}`,
    );
    if (!playlist) {
      playlist = (await this.playlistRepo.findOneBySlug(
        slug,
        PlaylistOutTypeEnum.Normal,
      )) as Playlist | null;

      if (!playlist) throw new NotFoundException('پلی لیست یافت نشد');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      playlist.ownerId = Number(playlist.ownerId);

      await this.redisService.setex(
        `blu:playlist:${slug}`,
        60 * 20,
        JSON.stringify(playlist),
      );
    } else {
      playlist = JSON.parse(playlist as string) as Playlist;
    }

    if (!playlist.bannerId) throw new BadRequestException('پلی لیست بنر ندارد');

    const bannerFileUrl = await getFileLink(
      playlist.bannerId,
      this.configService,
    );

    const response = await streamFileApi(bannerFileUrl);

    return new StreamableFile(response.data, {
      length: Number(response.headers['content-length']),
      type: 'image/jpeg',
    });
  }
  async trackThumbnail(uniqueId: string) {
    let track: string | Track | null = await this.redisService.get(
      `blu:track:${uniqueId}`,
    );
    if (!track) {
      track = (await this.trackRepo.findOneByUniqueId(
        uniqueId,
      )) as Track | null;

      if (!track) throw new NotFoundException('موزیک یافت نشد');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      track.addedById = Number(track.addedById);

      await this.redisService.setex(
        `blu:track:${uniqueId}`,
        60 * 20,
        JSON.stringify(track),
      );
    } else {
      track = JSON.parse(track as string) as Track;
    }
    if (!track.thumbnail) throw new BadRequestException('موزیک بنر ندارد');

    const bannerFileUrl = await getFileLink(
      track.thumbnail,
      this.configService,
    );

    const response = await streamFileApi(bannerFileUrl);

    return new StreamableFile(response.data, {
      length: Number(response.headers['content-length']),
      type: 'image/jpeg',
    });
  }
  async streamTrack(uniqueId: string, req: Request, res: Response) {
    let track: string | Track | null = await this.redisService.get(
      `blu:track:${uniqueId}`,
    );
    if (!track) {
      track = (await this.trackRepo.findOneByUniqueId(
        uniqueId,
      )) as Track | null;

      if (!track) throw new NotFoundException('موزیک یافت نشد');

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      track.addedById = Number(track.addedById);

      await this.redisService.setex(
        `blu:track:${uniqueId}`,
        60 * 20,
        JSON.stringify(track),
      );
    } else {
      track = JSON.parse(track as string) as Track;
    }

    if (!track.file_id) throw new NotFoundException('موزیک یافت نشد.');

    const musicFileUrl = await getFileLink(track.file_id, this.configService);

    const response = await streamFileApi(musicFileUrl, req.headers.range);
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Content-Length', response.headers['content-length']);
    if (response.headers['content-range'])
      res.setHeader('Content-Range', response.headers['content-range']);
    res.setHeader('Accept-Ranges', 'bytes');
    res.setHeader('Cache-Control', 'public, max-age=31536000');
    res.setHeader(
      'Content-Disposition',
      `${track.performer}_${track.title}.mp3`,
    );
    res.status(206);
    response.data.pipe(res);
  }
}
