import {
  Controller,
  Get,
  HttpCode,
  Post,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    response: Type.Void(),
  })
  async createAsset(body: Asset): Promise<void> {
    try {
      await this.assetsService.insert(body);
      return;
    } catch (error) {
      if (error.message === 'Invalid Type') {
        throw new BadRequestException('Invalid Asset Type');
      }
      throw error;
    }
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
    const asset = await this.assetsService.findOneBy(id);
    if (!asset) {
      throw new NotFoundException(`Asset with id ${id} not found`);
    }
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
