import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @IsUUID('4')
  @IsOptional()
  artistId: string;
}
