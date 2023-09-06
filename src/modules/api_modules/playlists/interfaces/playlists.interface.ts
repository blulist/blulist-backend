import { Playlist as _Playlist } from '@prisma/client';

export interface Playlist extends _Playlist {}
export interface PlaylistWithCounts extends Playlist {
  _count: {
    Track: number;
    Like: number;
  };
}

// export type ConditionalPlaylist<T extends boolean> = T extends true
//   ? PlaylistsWithCounts
//   : Playlist;

export enum PlaylistOutTypeEnum {
  Normal,
  WithCounts,
}

export type PlaylistResult<T extends PlaylistOutTypeEnum> =
  T extends PlaylistOutTypeEnum.Normal ? Playlist : PlaylistWithCounts;
