import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { Message } from './constants/message.constants';
import { CreateTrackDto, UpdateTrackDto } from './dto';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.prisma.track.create({
      data: { ...createTrackDto },
    });

    return newTrack;
  }

  async findAll(): Promise<Track[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new NotFoundException(Message.NOT_FOUND);

    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new NotFoundException(Message.NOT_FOUND);

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });

    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({ where: { id } });

    if (!track) throw new NotFoundException(Message.NOT_FOUND);

    // this.database.favorites.tracks = this.database.favorites.tracks.filter(
    //   (track) => track.id !== id,
    // );

    // this.database.tracks = this.database.tracks.filter(
    //   (track) => track.id !== id,
    // );

    await this.prisma.track.delete({ where: { id } });
  }
}
