import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { AppModule } from '../src/app.module';

import { Assets } from '../src/domains/assets/assets.entity';
import { Asset as AssestDTO } from '../src/domains/assets/assets.types';
import Seeder, { ISeeder } from './utils/seeder';
import InitDatasource from './utils/postgresDatasource';
import Fixtures from './utils/fixtures';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let seeder: ISeeder;
  let assetsRepository: Repository<Assets>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    seeder = await Seeder();
    await seeder.seedDatabase(2);

    assetsRepository = (await InitDatasource()).getRepository(Assets);
  });

  afterEach(async () => {
    await app.close();
    await seeder.clearDatabase();
  });

  describe('Assets endpoints', () => {
    describe('GET /assets/:id', () => {
      it('Given a assetId, when the endpoint is called and the asset exists, then it should return it', async () => {
        // Arrange
        const assetList: Assets[] = await assetsRepository.find();
        const asset: Assets = assetList[0];

        // Act
        const response = await request(app.getHttpServer())
          .get(`/assets/${asset.id}`)
          .expect(200);

        // Asserts
        expect(Object.keys(response.body)).toEqual(Object.keys(asset));
      });

      it('Given a assetId, when the endpoint is called and the asset does not exists, then it should return null', async () => {
        // Arrange
        const assetId: string = faker.string.uuid();

        // Act
        // const response = await request(app.getHttpServer())
        await request(app.getHttpServer())
          .get(`/assets/${assetId}`)
          // .expect(200);
          .expect(404);

        // Asserts
        // expect(response.body).toEqual({});
      });
    });
    describe('POST /assets', () => {
      it('Given an assets, when the endpoint is called, then it should create it', async () => {
        // Arrange
        await assetsRepository.clear();
        const assetToCreate: AssestDTO = Fixtures.createAsset(false);

        // Act
        await request(app.getHttpServer())
          .post('/assets')
          .send(assetToCreate)
          .expect(201);

        // Asserts
        const assetCreated: Assets[] = await assetsRepository.findBy({
          type: assetToCreate.type,
        });

        expect(assetCreated[0].type).toEqual(assetToCreate.type);
      });
    });
  });
});
