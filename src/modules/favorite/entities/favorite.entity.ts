import { AlbumEntity } from '../../album/entities/album.entity';
import { ArtistEntity } from '../../artist/entities/artist.entity';
import { TrackEntity } from '../../track/entities/track.entity';

export interface FavoritesEntity {
  albums: AlbumEntity[];
  artists: ArtistEntity[];
  tracks: TrackEntity[];
}
