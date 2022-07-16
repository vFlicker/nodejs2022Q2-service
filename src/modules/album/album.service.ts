import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as createId } from 'uuid';
import { Message } from './constants/album.constants';

import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/artist.interface';

@Injectable()
export class AlbumService {
  private readonly albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: createId(),
      ...createAlbumDto,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string) {
    const album = this.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(Message.NOT_FOUND);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string) {
    const index = this.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException(Message.NOT_FOUND);
    this.albums.splice(index, 1);
  }
}
