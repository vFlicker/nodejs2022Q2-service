import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album, Artist } from '@prisma/client';

import { DatabaseService } from '../database/database.service';
import { TrackEntity } from '../track/entities/track.entity';
import { FavoritesEntity } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(private readonly database: DatabaseService) {}

  addAlbum(id: string): Album {
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) {
      throw new UnprocessableEntityException(`Album doesn't exist.`);
    }
    this.database.favorites.albums.push(album);

    return album;
  }

  addArtist(id: string): Artist {
    const artist = this.database.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new UnprocessableEntityException(`Artist doesn't exist.`);
    }
    this.database.favorites.artists.push(artist);

    return artist;
  }

  addTrack(id: string): TrackEntity {
    const track = this.database.tracks.find((track) => track.id === id);
    if (!track) {
      throw new UnprocessableEntityException(`Track with doesn't exist.`);
    }
    this.database.favorites.tracks.push(track);
    return track;
  }

  findAll(): FavoritesEntity {
    return {
      albums: this.database.favorites.albums,
      artists: this.database.favorites.artists,
      tracks: this.database.favorites.tracks,
    };
  }

  removeAlbum(id: string): void {
    const album = this.database.favorites.albums.find(
      (album) => album.id === id,
    );
    if (!album) throw new NotFoundException();

    this.database.favorites.albums = this.database.favorites.albums.filter(
      (album) => album.id !== id,
    );
  }

  removeArtist(id: string): void {
    const artist = this.database.favorites.artists.find(
      (artist) => artist.id === id,
    );
    if (!artist) throw new NotFoundException();

    this.database.favorites.artists = this.database.favorites.artists.filter(
      (artist) => artist.id !== id,
    );
  }

  removeTrack(id: string): void {
    const track = this.database.favorites.tracks.find(
      (track) => track.id === id,
    );
    if (!track) throw new NotFoundException();

    this.database.favorites.tracks = this.database.favorites.tracks.filter(
      (track) => track.id !== id,
    );
  }
}
