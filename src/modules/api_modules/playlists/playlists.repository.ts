import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  PlaylistResult,
  PlaylistResultEnum,
  PlaylistsWithCounts,
} from './interfaces/playlists.interface';
import { Prisma } from '@prisma/client';

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

  findOneBySlug<T extends PlaylistResultEnum>(
    slug: string,
    outType: T,
  ): Promise<PlaylistResult<T> | null> {
    const op: Prisma.PlaylistFindUniqueArgs = {
      where: { slug },
    };
    if (outType == PlaylistResultEnum.WithCounts) {
      op.include = {
        _count: {
          select: {
            Like: true,
            Track: true,
          },
        },
      };
    }
    return this.db.playlist.findUnique(op) as unknown as Promise<
      PlaylistResult<T>
    > | null;
  }
}
