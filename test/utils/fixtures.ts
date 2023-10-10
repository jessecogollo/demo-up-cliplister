import { faker } from '@faker-js/faker';

export default {
  createAsset: (fullData = false) => ({
    name: faker.string.alpha(10),
    type: faker.string.alpha(10),
    url: faker.string.alpha(10),
    metadata: {
      mimetype: faker.string.alpha(10),
      size: faker.string.alpha(10),
    },
    ...(fullData && {
      id: faker.string.uuid(),
      created_at: faker.date.anytime(),
      updated_at: faker.date.anytime(),
    }),
  }),
};
