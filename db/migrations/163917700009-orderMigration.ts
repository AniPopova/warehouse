
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class OrderTable1639174000009 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.changeColumn('order', 'client_id', new TableColumn({
      name: 'client_id',
      type: 'uuid',
      isNullable: true,
    }));
    
    await queryRunner.changeColumn('order', 'warehouse_id', new TableColumn({
      name: 'warehouse_id',
      type: 'uuid',
      isNullable: true,
    }));

  }

  public async down(queryRunner: QueryRunner): Promise<void> {

  }
}
