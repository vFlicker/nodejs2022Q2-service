import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsUUID('4')
  artistId: string | null;

  @IsUUID('4')
  albumId: string | null;

  @IsNumber()
  duration: number;
}
