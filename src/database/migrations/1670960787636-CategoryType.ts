import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryType1670960787636 implements MigrationInterface {
  name = 'CategoryType1670960787636';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "category_type" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(30) NOT NULL, "description" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_952f389d65f58bb1cb285cd7258" UNIQUE ("name"), CONSTRAINT "PK_6c2bdfaadc414f95ca862fa5e0b" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "category_type"`);
  }
}
