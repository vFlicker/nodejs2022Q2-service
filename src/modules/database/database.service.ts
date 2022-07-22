import { Injectable } from '@nestjs/common';

import { AlbumEntity } from 'src/modules/album/entities/album.entity';
import { ArtistEntity } from '../artist/entities/artist.entity';
import { FavoritesEntity } from '../favorite/entities/favorite.entity';
import { TrackEntity } from '../track/entities/track.entity';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class DatabaseService {
  albums: AlbumEntity[] = [];
  tracks: TrackEntity[] = [];
  artists: ArtistEntity[] = [];
  users: User[] = [];
  favorites: FavoritesEntity = {
    albums: [],
    tracks: [],
    artists: [],
  };

  private static instance;

  constructor() {
    if (!DatabaseService.instance) DatabaseService.instance = this;
    return DatabaseService.instance;
  }
}
