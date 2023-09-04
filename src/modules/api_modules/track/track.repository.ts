import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackRepository {
  constructor(private db: PrismaService) {}

  findTracksByPlaylistId(
    playlistId: number,
    page: number,
    limit: number,
  ): Promise<Array<Track>> {
    return this.db.track.findMany({
      where: {
        playlistId: playlistId,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  findOneByUniqueId(uniqueId: string): Promise<Track | null> {
    return this.db.track.findUnique({
      where: {
        uniqueId,
      },
    });
  }
}
