import { Injectable } from '@nestjs/common';

import { Album } from 'src/modules/albums/interfaces/album.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Favorites } from '../favorites/interfaces/favorite.interface';
import { Track } from '../tracks/interfaces/track.interface';
import { User } from '../users/entities/user.entities';

@Injectable()
export class DatabaseService {
  albums: Album[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
  users: User[] = [];
  favorites: Favorites = {
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
