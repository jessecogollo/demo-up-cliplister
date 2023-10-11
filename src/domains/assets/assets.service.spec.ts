import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

import { Assets } from './assets.entity';
import { AssetsService } from './assets.service';
import { Asset as AssetDTO } from './assets.types';

import Fixtures from '../../../test/utils/fixtures';

describe('AssetsService', () => {
  let service: AssetsService;
  let repository: Repository<AssetDTO>;
  const AssetsRepositoryToken = getRepositoryToken(Assets);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AssetsService,
        {
          provide: AssetsRepositoryToken,
          useValue: {
            insert: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AssetsService>(AssetsService);
    repository = module.get<Repository<AssetDTO>>(AssetsRepositoryToken);
  });

  describe('Insert', () => {
    it('Given a asset, when the service is called, then the asset should be created', async () => {
      // Arrange
      const newAsset: AssetDTO = Fixtures.createAsset();

      const insertMock = jest.spyOn(repository, 'insert').mockImplementation();

      // Act
      await service.insert(newAsset);

      // Asserts
      expect(insertMock).toHaveBeenCalled();
    });

    it('Given a asset, when the service is called but something went wrong, then the function should return an error', async () => {
      // Arrange
      const newAsset: AssetDTO = Fixtures.createAsset();

      const insertMock = jest
        .spyOn(repository, 'insert')
        .mockRejectedValue(new Error());

      // Asserts
      await expect(service.insert(newAsset)).rejects.toThrow();
      expect(insertMock).toHaveBeenCalled();
    });
  });

  describe('findOneBy', () => {
    it('Given an id, when the service is called and the asset exists, then asset should be returned', async () => {
      // Arrange
      const assetData: AssetDTO = Fixtures.createAsset(true);
      const findMock = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(assetData);
      // Act
      const assetFromDB: AssetDTO = await service.findOneBy(assetData.id);
      // Asserts
      expect(assetFromDB).toEqual(assetData);
      expect(findMock).toHaveBeenCalledWith({ id: assetData.id });
    });

    it('Given an id, when the service is called and the asset does not exists, then the service should return null', async () => {
      // Arrange
      const assetId: string = faker.string.alpha(10);
      const findMock = jest
        .spyOn(repository, 'findOneBy')
        .mockResolvedValue(null);
      // Act
      const assetFromDB: AssetDTO = await service.findOneBy(assetId);
      // Asserts
      expect(assetFromDB).toEqual(null);
      expect(findMock).toHaveBeenCalledWith({ id: assetId });
    });

    it('Given an id, when the service is called but something went wrong, then the function should return an error', async () => {
      // Arrange
      const findMock = jest
        .spyOn(repository, 'findOneBy')
        .mockRejectedValue(new Error());
      // Asserts
      await expect(service.findOneBy(faker.string.alpha(10))).rejects.toThrow();
      expect(findMock).toHaveBeenCalled();
    });
  });
});
