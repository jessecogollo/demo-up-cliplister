// const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class AddAssetsTable1696959753954 {
  async up(queryRunner) {
    await queryRunner.query(`CREATE EXTENSION "uuid-ossp";`);
    await queryRunner.query(
      `CREATE TABLE "public"."assets" ("id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(), "name" character varying(255), "type" character varying(10), "url" character varying(255), "metadata" jsonb not null default '{}'::jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now())`,
    );
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "public"."assets"`);
    await queryRunner.query(`DROP EXTENSION "uuid-ossp";`);
  }
};
