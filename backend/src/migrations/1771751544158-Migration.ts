import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1771751544158 implements MigrationInterface {
    name = 'Migration1771751544158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isLoggedIn" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "todo" ADD "isCompleted" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "isCompleted"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isLoggedIn"`);
    }

}
