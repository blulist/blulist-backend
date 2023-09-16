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
    sort: string | null,
    outType: T,
  ): Promise<any> {
    const op: any = {
      orderBy: [
        {
          createdAt: 'desc',
        },
      ],
    };
    if (outType === PlaylistOutTypeEnum.WithCounts) {
      op.include = {
        _count: {
          select: {
            Track: true,
            Like: true,
          },
        },
      };
    }

    if (sort) {
      op.orderBy = [];
      if (sort == 'like') {
        op.orderBy.push({
          Like: {
            _count: 'desc',
          },
        });
      } else {
        op.orderBy.push({
          viewCount: 'desc',
        });
      }
    }
    return this.db.playlist.findMany({
      where: {
        Track: {
          some: {},
        },
        isPrivate: isPrivate,
      },

      take: limit,
      skip: (page - 1) * limit,
      ...op,
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
