import { Type, Static } from '@sinclair/typebox';

export const TypeDTO = Type.String({
  enum: ['picture', 'video'],
});

export const AssetDTO = Type.Object({
  id: Type.Optional(Type.String()),
  name: Type.String(),
  type: TypeDTO,
  url: Type.String(),
  metadata: Type.Object({}),
  created_at: Type.Optional(Type.Date()),
  updated_at: Type.Optional(Type.Date()),
});
export type Asset = Static<typeof AssetDTO>;
export type Type = Static<typeof TypeDTO>;

export interface AssetRepository {
  insert(asset: Asset): Promise<void>;
  findOneBy(id: string): Promise<Asset | null>;
}
