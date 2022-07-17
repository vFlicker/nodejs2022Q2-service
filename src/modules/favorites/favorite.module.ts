import { Module } from '@nestjs/common';

import { AlbumModule } from '../albums/album.module';
import { ArtistModule } from '../artists/artist.module';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { TrackModule } from '../tracks/track.module';

@Module({
  imports: [AlbumModule, ArtistModule, TrackModule],
  controllers: [FavoriteController],
  providers: [FavoriteService],
})
export class FavoriteModule {}
