import { Injectable, NotFoundException } from '@nestjs/common';
import { Artist } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { Message } from './constants/message.constants';
import { CreateArtistDto, UpdateArtistDto } from './dto';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    const newArtist = await this.prisma.artist.create({
      data: { ...createArtistDto },
    });

    return newArtist;
  }

  async findAll(): Promise<Artist[]> {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new NotFoundException(Message.NOT_FOUND);

    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new NotFoundException(Message.NOT_FOUND);

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });

    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({ where: { id } });

    if (!artist) throw new NotFoundException(Message.NOT_FOUND);

    // for (const album of this.database.albums) {
    //   if (album.artistId === id) album.artistId = null;
    // }

    // for (const track of this.database.tracks) {
    //   if (track.artistId === id) track.artistId = null;
    // }

    // this.database.favorites.artists = this.database.favorites.artists.filter(
    //   (artist) => artist.id !== id,
    // );

    // this.database.artists = this.database.artists.filter(
    //   (artist) => artist.id !== id,
    // );

    await this.prisma.artist.delete({ where: { id } });
  }
}
