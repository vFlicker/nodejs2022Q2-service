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

import { FavoriteService } from './favorite.service';
import { Favorites } from './interfaces/favorite.interface';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('/album/:id')
  addAlbum(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Favorites {
    return this.favoriteService.addAlbum(id);
  }

  @Post('/artist/:id')
  addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Favorites {
    return this.favoriteService.addArtist(id);
  }

  @Post('/track/:id')
  addTrack(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Favorites {
    return this.favoriteService.addTrack(id);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoriteService.removeAlbum(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoriteService.removeArtist(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoriteService.removeTrack(id);
  }
}
