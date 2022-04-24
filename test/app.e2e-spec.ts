import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movies API');
  });

  describe('/movies', () => {
    it('/movies (GET : 200)', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('/movies/1 (GET : 404)', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(404);
    });

    it('/movies (POST : 201)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          year: 2022,
          genres: ['test'],
        })
        .expect(201);
    });

    it('/movies/1 (PATCH : 404)', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({
          title: 'test(updated)',
        })
        .expect(404);
    });

    it('/movies/1 (DELETE : 404)', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(404);
    });
  });
});
