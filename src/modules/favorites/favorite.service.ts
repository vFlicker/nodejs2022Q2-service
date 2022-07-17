import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { Album } from '../albums/interfaces/album.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Track } from '../tracks/interfaces/track.interface';
import { Favorites } from './interfaces/favorite.interface';

@Injectable()
export class FavoriteService {
  constructor(private readonly database: DatabaseService) {}

  addAlbum(id: string): Album {
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) throw new UnprocessableEntityException();
    this.database.favorites.albums.push(album);

    return album;
  }

  addArtist(id: string): Artist {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) throw new UnprocessableEntityException();
    this.database.favorites.artists.push(artist);

    return artist;
  }

  addTrack(id: string): Track {
    const track = this.database.tracks.find((track) => track.id === id);
    if (!track) throw new UnprocessableEntityException();
    this.database.favorites.tracks.push(track);

    return track;
  }

  findAll(): Favorites {
    return {
      albums: this.database.favorites.albums,
      artists: this.database.favorites.artists,
      tracks: this.database.favorites.tracks,
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
