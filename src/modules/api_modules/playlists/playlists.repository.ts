import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  PlaylistOutTypeEnum,
  PlaylistResult,
} from './interfaces/playlists.interface';
import { Prisma } from '@prisma/client';

@Injectable()
export class PlaylistsRepository {
  constructor(private db: PrismaService) {}

  findAll<T extends PlaylistOutTypeEnum>(
    isPrivate: boolean,
    page: number,
    limit: number,
    outType: T,
  ): Promise<PlaylistResult<T>[]> {
    let op = {};
    if (outType === PlaylistOutTypeEnum.WithCounts) {
      op = {
        include: {
          _count: {
            select: {
              Track: true,
              Like: true,
            },
          },
        },
      };
    }
    return this.db.playlist.findMany({
      where: {
        isPrivate: isPrivate,
      },
      take: limit,
      skip: (page - 1) * limit,
      ...op,
      orderBy: {
        createdAt: 'desc',
      },
    }) as Promise<PlaylistResult<T>[]>;
  }

  findOneBySlug<T extends PlaylistOutTypeEnum>(
    slug: string,
    outType: T,
  ): Promise<PlaylistResult<T> | null> {
    const op: Prisma.PlaylistFindUniqueArgs = {
      where: { slug },
    };
    if (outType == PlaylistOutTypeEnum.WithCounts) {
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
