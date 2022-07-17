import { Module } from '@nestjs/common';

import { AlbumModule } from './modules/albums/album.module';
import { ArtistModule } from './modules/artists/artist.module';
import { DatabaseModule } from './modules/database/database.module';
import { FavoriteModule } from './modules/favorites/favorite.module';
import { TrackModule } from './modules/tracks/track.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    UserModule,
    ArtistModule,
    AlbumModule,
    DatabaseModule,
    FavoriteModule,
    TrackModule,
  ],
})
export class AppModule {}
