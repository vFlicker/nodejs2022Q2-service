import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as createId } from 'uuid';

import { DatabaseService } from '../database/database.service';

import { Message } from './constants/message.constants';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private readonly database: DatabaseService) {}

  create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = {
      id: createId(),
      ...createAlbumDto,
    };
    this.database.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.database.albums;
  }

  findOne(id: string) {
    const album = this.database.albums.find((album) => album.id === id);
    if (!album) throw new NotFoundException(Message.NOT_FOUND);
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = this.findOne(id);
    Object.assign(album, updateAlbumDto);
    return album;
  }

  remove(id: string) {
    const index = this.database.albums.findIndex((album) => album.id === id);
    if (index === -1) throw new NotFoundException(Message.NOT_FOUND);
    this.database.albums.splice(index, 1);
  }
}
