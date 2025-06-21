import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedByToBook1750520412083 implements MigrationInterface {
    name = 'AddCreatedByToBook1750520412083'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_add9d2fd4129b34ef869cdfb0f5"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_1a51e59e72964d90c46de5c930a"`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "created_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "updated_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_add9d2fd4129b34ef869cdfb0f5" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_1a51e59e72964d90c46de5c930a" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_1a51e59e72964d90c46de5c930a"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_add9d2fd4129b34ef869cdfb0f5"`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "updated_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_1a51e59e72964d90c46de5c930a" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_add9d2fd4129b34ef869cdfb0f5" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
