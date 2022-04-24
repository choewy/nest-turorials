import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MovieCreateDto } from './dto/movie-create.dto';
import { MovieUpdateDto } from './dto/movie-update.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getAllMovies(): Array<Movie> {
    return this.movieService.getAll();
  }

  @Post()
  create(@Body() movieCreateDto: MovieCreateDto): boolean {
    return this.movieService.create(movieCreateDto);
  }

  @Get('search')
  search(@Query('year') year: number) {
    return year;
  }

  @Get(':id')
  getOneMovie(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Delete(':id')
  delete(@Param('id') movieId: number): boolean {
    return this.movieService.deleteOne(movieId);
  }

  @Patch(':id')
  update(
    @Param('id') movieId: number,
    @Body() movieUpdateDto: MovieUpdateDto,
  ): boolean {
    return this.movieService.update(movieId, movieUpdateDto);
  }
}
