import { Module } from '@nestjs/common';

import { UserModule } from './modules/user/user.module';
import { ArtistModule } from './modules/artist/artist.module';
import { AlbumModule } from './modules/album/album.module';
import { TrackModule } from './modules/track/track.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule, TrackModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
