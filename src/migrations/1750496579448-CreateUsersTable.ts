import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1750496579448 implements MigrationInterface {
  name = 'CreateUsersTable1750496579448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "users_username_idx" ON "users" ("username") `,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "users_email_idx" ON "users" ("email") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."users_email_idx"`);
    await queryRunner.query(`DROP INDEX "public"."users_username_idx"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
