import { UserRights } from 'src/user/entities/user.entity';
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';


export class CreateUserTable1639171800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create User table
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'userRole',
            type: 'enum',
            enum: Object.values(UserRights),
            default: `'${UserRights.VIEWER}'`,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
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

    // Create unique index on email column
    await queryRunner.createIndex(
      'user',
      new TableIndex({
        name: 'IDX_USER_EMAIL',
        columnNames: ['email'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop User table
    await queryRunner.dropTable('user');

    // Drop unique index on email column
    await queryRunner.dropIndex('user', 'IDX_USER_EMAIL');
  }
}
