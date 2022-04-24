import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // TEST getAll()
  describe('getAll()', () => {
    it('should return array', () => {
      expect(service.getAll()).toEqual([]);
    });
  });

  // TEST create()
  describe('create()', () => {
    it('should return true', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
      expect(movie.title).toEqual('test');
    });
  });

  // TEST getOne()
  describe('getOne(999)', () => {
    it('should return a movie', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      const movie = service.getOne(1);
      expect(movie).toBeDefined();
      expect(movie.id).toEqual(1);
    });

    it('should throw 404 Error', () => {
      try {
        service.getOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie not found 999');
      }
    });
  });

  // TEST deleteOne()
  describe('deleteOne(999)', () => {
    it('should return true', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      const result = service.deleteOne(1);
      const movies = service.getAll();
      expect(result).toEqual(true);
      expect(movies.length).toEqual(0);
    });

    it('should throw 404 Error', () => {
      try {
        service.deleteOne(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie not found 999');
      }
    });
  });

  // TEST updateOne()
  describe('deleteOne(999)', () => {
    it('should return true', () => {
      service.create({
        title: 'test',
        genres: ['test'],
        year: 2022,
      });
      const result = service.update(1, {
        title: 'test(updated)',
      });
      const movie = service.getOne(1);
      expect(result).toEqual(true);
      expect(movie.title).toEqual('test(updated)');
    });

    it('should throw 404 Error', () => {
      try {
        service.update(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toEqual('Movie not found 999');
      }
    });
  });
});
