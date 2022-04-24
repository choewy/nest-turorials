import { IsNumber, IsString } from 'class-validator';

export class MovieCreateDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsString({ each: true })
  readonly genres: string[];
}
