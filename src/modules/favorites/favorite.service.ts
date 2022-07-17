import { Injectable } from '@nestjs/common';

import { AlbumService } from '../albums/album.service';
import { ArtistService } from '../artists/artist.service';
import { TrackService } from '../tracks/track.service';
import { Favorites, FavoritesResponse } from './interfaces/favorite.interface';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
    private readonly trackService: TrackService,
  ) {}

  private readonly favorites: Favorites = {
    albums: [],
    artists: [],
    tracks: [],
  };

  addAlbum(id: string): Favorites {
    this.favorites.albums.push(id);
    return this.favorites;
  }

  addArtist(id: string): Favorites {
    this.favorites.artists.push(id);
    return this.favorites;
  }

  addTrack(id: string): Favorites {
    this.favorites.tracks.push(id);
    return this.favorites;
  }

  findAll(): FavoritesResponse {
    return {
      albums: this.albumService.findAll(),
      artists: this.artistService.findAll(),
      tracks: this.trackService.findAll(),
    };
  }

  removeAlbum(id: string): void {
    const index = this.favorites.albums.findIndex((album) => album === id);
    this.favorites.albums.splice(index, 1);
  }

  removeArtist(id: string): void {
    const index = this.favorites.artists.findIndex((artist) => artist === id);
    this.favorites.artists.splice(index, 1);
  }

  removeTrack(id: string): void {
    const index = this.favorites.tracks.findIndex((track) => track === id);
    this.favorites.tracks.splice(index, 1);
  }
}
