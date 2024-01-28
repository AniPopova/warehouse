import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1705915316278 implements MigrationInterface {
    name = 'NewMigration1705915316278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_bebc9158e480b949565b4dc7a82"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_965abf9f99ae8c5983ae74ebde8"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_15d25c200d9bcd8a33f698daf18"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1031171c13130102495201e3e20"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_0e44ade58bedb3823232b0dec51" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_1e74a9888e5e228184769ba3dfd" FOREIGN KEY ("order_id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0" FOREIGN KEY ("client_id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_a0d9cbb7f4a017bac3198dd8ca0"`);
        await queryRunner.query(`ALTER TABLE "invoice" DROP CONSTRAINT "FK_1e74a9888e5e228184769ba3dfd"`);
        await queryRunner.query(`ALTER TABLE "warehouse" DROP CONSTRAINT "FK_0e44ade58bedb3823232b0dec51"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1031171c13130102495201e3e20" FOREIGN KEY ("id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "invoice" ADD CONSTRAINT "FK_15d25c200d9bcd8a33f698daf18" FOREIGN KEY ("id") REFERENCES "order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "warehouse" ADD CONSTRAINT "FK_965abf9f99ae8c5983ae74ebde8" FOREIGN KEY ("id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_bebc9158e480b949565b4dc7a82" FOREIGN KEY ("id") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
