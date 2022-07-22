import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AlbumModule } from './modules/albums/album.module';
import { ArtistModule } from './modules/artists/artist.module';
import { DatabaseModule } from './modules/database/database.module';
import { FavoriteModule } from './modules/favorites/favorite.module';
import { TrackModule } from './modules/tracks/track.module';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    ArtistModule,
    AlbumModule,
    DatabaseModule,
    FavoriteModule,
    TrackModule,
    PrismaModule,
  ],
})
export class AppModule {}
