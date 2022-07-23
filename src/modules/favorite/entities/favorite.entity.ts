import { Album, Artist, Track } from '@prisma/client';

export interface FavoritesEntity {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
