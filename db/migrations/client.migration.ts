import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateClientTable1639172000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create Client table
    await queryRunner.createTable(
      new Table({
        name: 'client',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'identification_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Create unique index on identification_code column
    await queryRunner.createIndex(
      'client',
      new TableIndex({
        name: 'IDX_CLIENT_IDENTIFICATION_CODE',
        columnNames: ['identification_code'],
        isUnique: true,
        where: 'identification_code IS NOT NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop Client table
    await queryRunner.dropTable('client');

    // Drop unique index on identification_code column
    await queryRunner.dropIndex('client', 'IDX_CLIENT_IDENTIFICATION_CODE');
  }
}
