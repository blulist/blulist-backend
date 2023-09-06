import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TrackRepository } from './track.repository';
import { Track } from './interfaces/track.interface';
import { ResponseFormat } from '../shared/interfaces/response.interface';

@Injectable()
export class TrackService {
  constructor(private trackRepo: TrackRepository) {}
  async getTrackBySlug(slug: string): Promise<ResponseFormat<any>> {
    const track: Track | null = await this.trackRepo.findOneByUniqueId(slug);
    if (!track) throw new NotFoundException('فایل یافت نشد.');
    return {
      statusCode: HttpStatus.OK,
      data: {
        uniqueId: track.uniqueId,
        title: track.title,
        performer: track.performer,
        duration: track.duration,
        isHaveThumbnail: !!track.thumbnail,
      },
    };
  }
}
