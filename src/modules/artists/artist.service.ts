import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as createId } from 'uuid';

import { Message } from './constants/message.constants';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  private readonly artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist = {
      id: createId(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) throw new NotFoundException(Message.NOT_FOUND);
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);
    Object.assign(artist, updateArtistDto);
    return artist;
  }

  remove(id: string): void {
    const index = this.artists.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException(Message.NOT_FOUND);
    this.artists.splice(index, 1);
  }
}
