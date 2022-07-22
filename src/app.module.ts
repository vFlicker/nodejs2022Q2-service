import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  AlbumModule,
  ArtistModule,
  DatabaseModule,
  FavoriteModule,
  TrackModule,
  UserModule,
  PrismaModule,
} from './modules';

@Module({
  imports: [
    ConfigModule,
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
