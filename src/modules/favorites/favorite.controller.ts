import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { Album } from '../albums/interfaces/album.interface';
import { Artist } from '../artists/interfaces/artist.interface';
import { Track } from '../tracks/interfaces/track.interface';
import { FavoriteService } from './favorite.service';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/album/:id')
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Album {
    return this.favoriteService.addAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Artist {
    return this.favoriteService.addArtist(id);
  }

  @Post('/track/:id')
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Track {
    return this.favoriteService.addTrack(id);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.removeArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoriteService.removeTrack(id);
  }
}
