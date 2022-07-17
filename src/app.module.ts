import { Module } from '@nestjs/common';

import { UserModule } from './modules/users/user.module';
import { ArtistModule } from './modules/artists/artist.module';
import { AlbumModule } from './modules/albums/album.module';
import { TrackModule } from './modules/tracks/track.module';
import { FavoriteModule } from './modules/favorites/favorite.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, FavoriteModule, TrackModule],
})
export class AppModule {}
