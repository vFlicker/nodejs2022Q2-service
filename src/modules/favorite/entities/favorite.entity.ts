import { Album, Artist } from '@prisma/client';

import { TrackEntity } from '../../track/entities/track.entity';

export interface FavoritesEntity {
  albums: Album[];
  artists: Artist[];
  tracks: TrackEntity[];
}
