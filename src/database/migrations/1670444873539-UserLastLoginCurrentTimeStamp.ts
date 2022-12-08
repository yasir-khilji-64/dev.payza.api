import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLastLoginCurrentTimeStamp1670444873539
  implements MigrationInterface
{
  name = 'UserLastLoginCurrentTimeStamp1670444873539';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "last_login" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "last_login" SET DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "last_login" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "last_login" DROP NOT NULL`,
    );
  }
}
