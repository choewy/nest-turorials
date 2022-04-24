import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieCreateDto } from './dto/movie-create.dto';
import { MovieUpdateDto } from './dto/movie-update.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Array<Movie> = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(movieId: number): Movie {
    const movie: Movie | null = this.movies.find(
      (movie) => movie.id === movieId,
    );
    if (!movie) {
      const message = `Movie not found ${movieId}`;
      throw new NotFoundException(message);
    }
    return movie;
  }

  create(movieCreateDto: MovieCreateDto): boolean {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieCreateDto,
    });
    return true;
  }

  update(movieId: number, movieUpdateDto: MovieUpdateDto): boolean {
    this.getOne(movieId);
    this.movies.map((movie) =>
      movie.id === movieId ? { ...movie, ...movieUpdateDto } : movie,
    );
    return true;
  }

  deleteOne(movieId: number): boolean {
    this.getOne(movieId);
    this.movies = this.movies.filter((movie) => movie.id !== movieId);
    return true;
  }
}
