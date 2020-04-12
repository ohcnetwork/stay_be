import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createfacility1586659778148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: 'facility',
            columns: [
              {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'address',
                type: 'varchar',
              },
              {
                name:'panchayath',
                type:'varchar',
              },
              {
                name:'longitude',
                type:'varchar',
              },
              {
                name:'latitude',
                type:'varchar',
              },
              {
                name: 'cost',
                type:'bigint',
              },
              {
                name: 'rooms_Available',
                type: 'bigint',
                isNullable: false,
              },
              {
                name: 'telephone',
                type: 'bigint',
                isNullable: false,
              },
              {
                name: 'status',
                type: 'varchar',
                default: '\'ACTIVE\'',
              },
              {
                name: 'star_category',
                type: 'int',
              },
              {
                  name: 'stayDescription',
                  type: 'varchar'
              },
              {
      
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                isNullable: false,
              },
              {
                  name: 'photos',
                  type: 'varchar',
                  isNullable: true
              },
              
              {
      
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                isNullable: false,
              },
            ],
          }), true);
        }
    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "facility"`);
    }

}
