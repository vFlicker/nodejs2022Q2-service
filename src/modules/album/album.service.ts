import { Injectable, NotFoundException } from '@nestjs/common';
import { Album } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { Message } from './constants/message.constants';
import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const newAlbum = await this.prisma.album.create({
      data: { ...createAlbumDto },
    });

    return newAlbum;
  }

  async findAll(): Promise<Album[]> {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new NotFoundException(Message.NOT_FOUND);

    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new NotFoundException(Message.NOT_FOUND);

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });

    return updatedAlbum;
  }

  async remove(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({ where: { id } });

    if (!album) throw new NotFoundException(Message.NOT_FOUND);

    // for (const track of this.database.tracks) {
    //   if (track.albumId === id) track.albumId = null;
    // }

    // this.database.albums = this.database.albums.filter(
    //   (album) => album.id !== id,
    // );

    // this.database.favorites.albums = this.database.albums.filter(
    //   (album) => album.id !== id,
    // );

    await this.prisma.album.delete({ where: { id } });
  }
}
