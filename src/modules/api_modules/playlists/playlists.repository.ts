import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  Playlist,
  PlaylistsWithCounts,
} from './interfaces/playlists.interface';

@Injectable()
export class PlaylistsRepository {
  constructor(private db: PrismaService) {}

  findAll(
    isPrivate: boolean,
    page: number,
    limit: number,
  ): Promise<PlaylistsWithCounts[]> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.db.playlist.findMany({
      where: {
        isPrivate: isPrivate,
      },
      take: limit,
      skip: (page - 1) * limit,
      include: {
        _count: {
          select: {
            Track: true,
            Like: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findOneBySlug(slug: string): Promise<Playlist | null> {
    return this.db.playlist.findUnique({
      where: { slug },
    });
  }
}
