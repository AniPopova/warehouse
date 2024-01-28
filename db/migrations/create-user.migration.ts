import { MigrationInterface, QueryRunner, Table } from 'typeorm';
// import { CreateUserDto } from './user/dto/create-user.dto';
// import { UserRights } from 'src/user/entities/user.entity';

export class CreateUsersTable1620027874211 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        { name: 'id', type: 'uuid', isPrimary: true, default: 'uuid_generate_v4()' },
        { name: 'username', type: 'varchar' },
        { name: 'password', type: 'varchar' },
        { name: 'email', type: 'varchar', isUnique: true },
        { name: 'userRole', type: 'varchar' }, 
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
