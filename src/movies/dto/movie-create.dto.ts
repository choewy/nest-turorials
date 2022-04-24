import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class MovieCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly title!: string;

  @IsNotEmpty()
  @IsNumber()
  readonly year!: number;

  @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}
