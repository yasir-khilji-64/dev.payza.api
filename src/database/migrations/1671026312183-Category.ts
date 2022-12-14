import { MigrationInterface, QueryRunner } from 'typeorm';

export class Category1671026312183 implements MigrationInterface {
  name = 'Category1671026312183';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "description" character varying, "color" character varying(7) NOT NULL DEFAULT '#386cac', "category_type_id" uuid NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_23c05c292c439d77b0de816b500" UNIQUE ("name"), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_9713344c6ff2efad9a7549fd4a7" FOREIGN KEY ("category_type_id") REFERENCES "category_type"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_9713344c6ff2efad9a7549fd4a7"`,
    );
    await queryRunner.query(`DROP TABLE "category"`);
  }
}
