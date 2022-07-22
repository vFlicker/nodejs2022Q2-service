import { Album } from '@prisma/client';

import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';

export interface FavoritesEntity {
  albums: Album[];
  artists: ArtistEntity[];
  tracks: TrackEntity[];
}
