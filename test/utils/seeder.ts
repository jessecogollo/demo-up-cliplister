import { Assets } from '../../src/domains/assets/assets.entity';
import { Asset as AssetsDTO } from '../../src/domains/assets/assets.types';

import InitDatasource from './postgresDatasource';
import Fixtures from './fixtures';

export interface ISeeder {
  seedDatabase(numberOfRecords: number): Promise<void>;
  clearDatabase(): Promise<void>;
}

export default async function seeder(): Promise<ISeeder> {
  const connection = await InitDatasource();
  const assetsRepository = connection.getRepository(Assets);

  return {
    seedDatabase: async (numberOfRecords: number): Promise<void> => {
      const assetsToCreate: AssetsDTO[] = [];
      for (let i = 0; i < numberOfRecords; i++) {
        assetsToCreate.push(
          assetsRepository.create(Fixtures.createAsset(true)),
        );
      }

      await assetsRepository.save(assetsToCreate);
    },
    clearDatabase: async (): Promise<void> => {
      await assetsRepository.clear();
    },
  };
}
