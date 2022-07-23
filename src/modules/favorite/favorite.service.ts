import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album, Artist, Favorite, Track } from '@prisma/client';

import { DatabaseService } from '../database/database.service';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from './constants/message.constants';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly database: DatabaseService,
    private prisma: PrismaService,
  ) {}

  async addAlbum(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) {
      throw new UnprocessableEntityException(Message.NOT_EXISTENCE('Album'));
    }

    await this.prisma.favorite.create({
      data: {
        album: { connect: { id } },
      },
    });

    return album;
  }

  async addArtist(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) {
      throw new UnprocessableEntityException(Message.NOT_EXISTENCE('Artist'));
    }

    await this.prisma.favorite.create({
      data: {
        artist: { connect: { id } },
      },
    });

    return artist;
  }

  async addTrack(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) {
      throw new UnprocessableEntityException(Message.NOT_EXISTENCE('Track'));
    }

    await this.prisma.favorite.create({
      data: {
        track: { connect: { id } },
      },
    });

    return track;
  }

  async findAll(): Promise<Favorite[]> {
    // TODO: should return { albums: [albums], artists: [artists], tracks: [tracks] }
    const favorites = await this.prisma.favorite.findMany();
    return favorites;
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
