import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBookCoverFields1750585482198 implements MigrationInterface {
  name = 'AddBookCoverFields1750585482198';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" ADD "cover_filename" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "book" ADD "cover_url" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "cover_url"`);
    await queryRunner.query(`ALTER TABLE "book" DROP COLUMN "cover_filename"`);
  }
}
