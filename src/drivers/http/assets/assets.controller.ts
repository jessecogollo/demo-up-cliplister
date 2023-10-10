import { Controller, Get, HttpCode, Post } from '@nestjs/common';
import { Validate } from 'nestjs-typebox';

import { AssetsService } from '../../../domains/assets/assets.service';
import { Asset, AssetDTO } from '../../../domains/assets/assets.types';
import { Type } from '@sinclair/typebox';

@Controller('assets')
export class AssetsController {
  constructor(private assetsService: AssetsService) {}

  @Post()
  @HttpCode(201)
  @Validate({
    request: [{ type: 'body', schema: AssetDTO }],
  })
  async createAsset(body: Asset): Promise<string | void> {
    await this.assetsService.insert(body);
    return Promise.resolve('Asset created');
    // return this.assetsService.insert(body);
  }

  // @Get()
  // @Validate({
  //   response: Type.Array(AssetDTO),
  // })
  // async getAllAssets(): Promise<Array<Asset>> {
  //   return this.assetsService.findAll();
  // }

  @Get(':id')
  @Validate({
    request: [{ name: 'id', type: 'param', schema: Type.String() }],
    response: AssetDTO,
  })
  async getById(id: string): Promise<Asset> {
    console.log('controller id', id);
    return this.assetsService.findOneBy(id);
  }

  // @Get('random')
  // @Validate({
  //   response: AssetDTO,
  // })
  // async getByRandom(): Promise<Asset> {
  //   return this.assetsService.findOneRandom();
  // }
}
