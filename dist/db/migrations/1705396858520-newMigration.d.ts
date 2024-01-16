import { MigrationInterface, QueryRunner } from "typeorm";
export declare class NewMigration1705396858520 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
