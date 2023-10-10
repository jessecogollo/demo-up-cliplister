import { Type, Static } from '@sinclair/typebox';
export const AssetDTO = Type.Object({
  id: Type.String(),
  name: Type.String(),
  type: Type.String(),
  // type: Type.Enum(['image', 'video']),
  url: Type.String(),
  metadata: Type.Object({}),
  created_at: Type.Optional(Type.Date()),
  updated_at: Type.Optional(Type.Date()),
});
export type Asset = Static<typeof AssetDTO>;

export interface AssetRepository {
  insert(asset: Asset): Promise<void>;
  findOneBy(id: string): Promise<Asset | null>;
}
