import { Injectable } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { Favorites, FavoritesResponse } from './interfaces/favorite.interface';

@Injectable()
export class FavoriteService {
  constructor(private readonly database: DatabaseService) {}

  addAlbum(id: string): Favorites {
    this.database.favorites.albums.push(id);
    return this.database.favorites;
  }

  addArtist(id: string): Favorites {
    this.database.favorites.artists.push(id);
    return this.database.favorites;
  }

  addTrack(id: string): Favorites {
    this.database.favorites.tracks.push(id);
    return this.database.favorites;
  }

  findAll(): FavoritesResponse {
    return {
      albums: this.database.albums,
      artists: this.database.artists,
      tracks: this.database.tracks,
    };
  }

  removeAlbum(id: string): void {
    const index = this.database.favorites.albums.findIndex(
      (album) => album === id,
    );
    this.database.favorites.albums.splice(index, 1);
  }

  removeArtist(id: string): void {
    const index = this.database.favorites.artists.findIndex(
      (artist) => artist === id,
    );
    this.database.favorites.artists.splice(index, 1);
  }

  removeTrack(id: string): void {
    const index = this.database.favorites.tracks.findIndex(
      (track) => track === id,
    );
    this.database.favorites.tracks.splice(index, 1);
  }
}
