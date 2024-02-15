import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class OrderTable1639174000005 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['TRANSFER', 'ORDER', 'DELIVERY'],
          },
          {
            name: 'client_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'warehouse_id',
            type: 'uuid',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');

    await queryRunner.dropForeignKey('order', 'FK_ORDER_CLIENT');
    await queryRunner.dropForeignKey('order', 'FK_ORDER_WAREHOUSE');
  }
}
