import { Playlist as _Playlist } from '@prisma/client';

export interface Playlist extends _Playlist {}
export interface PlaylistsWithCounts extends Playlist {
  _count: {
    Track: number;
    Like: number;
  };
}
