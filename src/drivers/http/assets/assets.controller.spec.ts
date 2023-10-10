import { Test, TestingModule } from '@nestjs/testing';

import { AssetsController } from './assets.controller';
import { AssetsService } from '../../../domains/assets/assets.service';
import { Assets } from '../../../domains/assets/assets.entity';
import { Asset as AssetDTO } from '../../../domains/assets/assets.types';

import Fixtures from '../../../../test/utils/fixtures';
import { faker } from '@faker-js/faker';

describe('AssetsController', () => {
  let assetsController: AssetsController;
  let assetsService: AssetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetsController],
      providers: [
        {
          provide: AssetsService,
          useValue: {
            insert: jest.fn(),
            // findAll: jest.fn(),
            findOneBy: jest.fn(),
            // findOneRandom: jest.fn(),
          },
        },
      ],
    }).compile();

    assetsService = module.get<AssetsService>(AssetsService);
    assetsController = module.get<AssetsController>(AssetsController);
  });

  // describe('getAllAssets', () => {
  //   it('Given a list of assets stored in the DB, when the controller is called, then it should return all of them', async () => {
  //     // Arrange
  //     const assetsList: Assets[] = [
  //       Fixtures.createAsset(true),
  //       Fixtures.createAsset(true),
  //     ];

  //     const findAllMock = jest
  //       .spyOn(assetsService, 'findAll')
  //       .mockResolvedValue(assetsList);

  //     // Act
  //     const result = await assetsController.getAllAssets();

  //     // Asserts
  //     expect(result).toEqual(assetsList);
  //     expect(findAllMock).toHaveBeenCalled();
  //   });

  //   it('Given a list of assets stored in the DB, when the controller is called, then it should return all of them', async () => {
  //     // Arrange
  //     jest.spyOn(assetsService, 'findAll').mockRejectedValue(new Error());

  //     // Asserts
  //     await expect(assetsController.getAllAssets()).rejects.toThrow();
  //   });
  // });

  describe('getById', () => {
    it('Given an asset id, when the controller is called and the asset exists, then it should return the asset', async () => {
      // Arrange
      const asset: Assets = Fixtures.createAsset(true);

      const findAllMock = jest
        .spyOn(assetsService, 'findOneBy')
        .mockResolvedValue(asset);

      // Act
      const result = await assetsController.getById(asset.id);

      // Asserts
      expect(result).toEqual(asset);
      expect(findAllMock).toHaveBeenCalledWith(asset.id);
    });

    it('Given an asset id, when the controller is called and the asset does not exists, then it should return null', async () => {
      // Arrange
      const assetId: string = faker.string.uuid();

      const findAllMock = jest
        .spyOn(assetsService, 'findOneBy')
        .mockResolvedValue(null);

      // Act
      const result = await assetsController.getById(assetId);

      // Asserts
      expect(result).toEqual(null);
      expect(findAllMock).toHaveBeenCalledWith(assetId);
    });

    it('Given an assert id, when the controller is called and something went wrong, then it should return an error', async () => {
      // Arrange
      jest.spyOn(assetsService, 'findOneBy').mockRejectedValue(new Error());

      // Asserts
      await expect(
        assetsController.getById(faker.string.uuid()),
      ).rejects.toThrow();
    });
  });

  describe('createAsset', () => {
    it('Given a asset, when the controller is called, then the asset should be created', async () => {
      // Arrange
      const asset: AssetDTO = Fixtures.createAsset();

      const insertMock = jest
        .spyOn(assetsService, 'insert')
        .mockResolvedValue();

      // Act
      await assetsController.createAsset(asset);

      // Asserts
      expect(insertMock).toHaveBeenCalled();
    });

    it('Given a list of assets stored in the DB, when the controller is called, then it should return all of them', async () => {
      // Arrange
      const asset: AssetDTO = Fixtures.createAsset();
      jest.spyOn(assetsService, 'insert').mockRejectedValue(new Error());

      // Asserts
      await expect(assetsController.createAsset(asset)).rejects.toThrow();
    });
  });
});
