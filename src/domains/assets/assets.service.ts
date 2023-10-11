import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Ajv, { ValidateFunction } from 'ajv';

import { Assets } from './assets.entity';
import { Asset, AssetRepository, Type, TypeDTO } from './assets.types';
import { StringContentEncodingOption } from '@sinclair/typebox';
import BusinessError from '../../utils/businessError';

@Injectable()
export class AssetsService implements AssetRepository {
  private ajv = new Ajv();

  constructor(
    @InjectRepository(Assets) private assetsRepository: Repository<Assets>,
  ) {}

  async insert(asset: Asset): Promise<void> {
    const assetValidation: ValidateFunction<Type> = this.ajv.compile(TypeDTO);
    const isValidAsset: boolean = assetValidation(asset.type);

    if (!isValidAsset) throw new BusinessError('Invalid Type', 'Asset service');
    await this.assetsRepository.insert({
      ...asset,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }

  findOneBy(id: StringContentEncodingOption): Promise<Asset | null> {
    return this.assetsRepository.findOneBy({ id });
  }
}
