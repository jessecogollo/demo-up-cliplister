import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Assets } from './assets.entity';
import { Asset as AssetDTO, AssetRepository } from './assets.types';
import { StringContentEncodingOption } from '@sinclair/typebox';

@Injectable()
export class AssetsService implements AssetRepository {
  constructor(
    @InjectRepository(Assets) private assetsRepository: Repository<Assets>,
  ) {}

  async insert(asset: AssetDTO): Promise<void> {
    console.log('service asset', asset);

    await this.assetsRepository.insert({
      ...asset,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  findOneBy(id: StringContentEncodingOption): Promise<Assets | null> {
    console.log('service id', id);
    return this.assetsRepository.findOneBy({ id });
  }
}
