import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';

describe('API ShopNova (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /health responde 200 con status ok', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect((res) => expect(res.body.status).toBe('ok'));
  });

  it('GET /productos responde 200 con el catálogo', () => {
    return request(app.getHttpServer())
      .get('/productos')
      .expect(200)
      .expect((res) => expect(res.body).toHaveLength(2));
  });

  it('POST /productos crea un producto y responde 201', () => {
    return request(app.getHttpServer())
      .post('/productos')
      .send({ nombre: 'Mouse inalámbrico', precio: 59900, stock: 30 })
      .expect(201)
      .expect((res) => expect(res.body.id).toBe(3));
  });

  it('GET /productos/:id responde 404 si no existe', () => {
    return request(app.getHttpServer()).get('/productos/99').expect(404);
  });
});
