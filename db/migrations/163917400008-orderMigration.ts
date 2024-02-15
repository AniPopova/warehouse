import { MigrationInterface, QueryRunner } from 'typeorm';

export class OrderTable1639174000008 implements MigrationInterface {
  
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropForeignKey('order', 'FK_ORDER_CLIENT');
    } catch (error) {
      console.error('Error dropping FK_ORDER_CLIENT:', error.message);
    }

    try {
      await queryRunner.dropForeignKey('order', 'FK_ORDER_WAREHOUSE');
    } catch (error) {
      console.error('Error dropping FK_ORDER_WAREHOUSE:', error.message);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
   
  }
}


