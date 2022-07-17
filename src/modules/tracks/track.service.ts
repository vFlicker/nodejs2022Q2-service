import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as createId } from 'uuid';

import { DatabaseService } from '../database/database.service';
import { Message } from './constants/message.constants';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  constructor(private readonly database: DatabaseService) {}

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = {
      id: createId(),
      ...createTrackDto,
    };

    this.database.tracks.push(newTrack);
    return newTrack;
  }

  findAll() {
    return this.database.tracks;
  }

  findOne(id: string) {
    const track = this.database.tracks.find((track) => track.id === id);
    if (!track) throw new NotFoundException(Message.NOT_FOUND);
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = this.findOne(id);
    Object.assign(track, updateTrackDto);
    return track;
  }

  remove(id: string) {
    const index = this.database.tracks.findIndex((track) => track.id === id);
    if (index === -1) throw new NotFoundException(Message.NOT_FOUND);
    this.database.tracks.splice(index, 1);
  }
}
