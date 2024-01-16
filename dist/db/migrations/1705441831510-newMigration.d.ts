import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NewMigration1705441831510 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
