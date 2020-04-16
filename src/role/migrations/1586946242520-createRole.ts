import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class createRole1586946242520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: 'role',
            columns: [
              {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'userId',
                type: 'bigint',
                isUnique:true,
              },
              {
                name: 'facilityId',
                type: 'bigint',
                isUnique:true,  
              },
              {
                  name: 'role',
                  type: 'varchar',
                  isUnique:true,
              },
              {
                name: 'status',
                type: 'varchar',
                default: '\'ACTIVE\'',
              },

              {
      
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                isNullable: false,
              },
            ],
          }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
