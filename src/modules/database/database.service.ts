import { Injectable } from '@nestjs/common';
import { Album, Artist, Track } from '@prisma/client';

import { FavoritesEntity } from '../favorite/entities/favorite.entity';
import { User } from '../user/interfaces/user.interface';

@Injectable()
export class DatabaseService {
  albums: Album[] = [];
  tracks: Track[] = [];
  artists: Artist[] = [];
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
