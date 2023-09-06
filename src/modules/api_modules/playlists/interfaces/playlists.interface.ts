import { Playlist as _Playlist } from '@prisma/client';

export interface Playlist extends _Playlist {}
export interface PlaylistsWithCounts extends Playlist {
  _count: {
    Track: number;
    Like: number;
  };
}

// export type ConditionalPlaylist<T extends boolean> = T extends true
//   ? PlaylistsWithCounts
//   : Playlist;

export enum PlaylistResultEnum {
  Normal,
  WithCounts,
}

export type PlaylistResult<T extends PlaylistResultEnum> =
  T extends PlaylistResultEnum.Normal ? Playlist : PlaylistsWithCounts;
