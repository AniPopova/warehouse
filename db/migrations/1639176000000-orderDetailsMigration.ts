import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class OrderDetailsTable1639176000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: 'order_details',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'warehouse_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'quantity',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'price',
            type: 'numeric',
            isNullable: false,
          },
          { name: 'total_price', 
            type: 'numeric', 
            isNullable: true 
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

    
    await queryRunner.createForeignKey(
      'order_details',
      new TableForeignKey({
        columnNames: ['warehouse_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'warehouse',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_details',
      new TableForeignKey({
        columnNames: ['order_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'order_details',
      new TableForeignKey({
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'product',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_details');
    await queryRunner.dropForeignKey('order_details', 'FK_ORDER_DETAILS_WAREHOUSE');
    await queryRunner.dropForeignKey('order_details', 'FK_ORDER_DETAILS_ORDER');
    await queryRunner.dropForeignKey('order_details', 'FK_ORDER_DETAILS_PRODUCT');
  }
}
