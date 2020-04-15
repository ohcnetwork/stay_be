import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Createfacility1586659778148 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: 'facility',
            columns: [
              {
                name: 'hotelId',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'hotelName',
                type: 'varchar',
              },
              {
                name: 'address',
                type: 'varchar',
              },
              {
                name: 'hotelOwnerId',
                type: 'bigint',  
                isNullable: true
              },
              {
                name:'panchayath',
                type:'varchar',
                isNullable: true
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
                name: 'status',
                type: 'varchar',
                default: '\'ACTIVE\'',
              },
              {
                name: 'starCategory',
                type: 'bigint',
              },
              {
                  name: 'facilityDescription',
                  type: 'varchar'
              },
              {
      
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP',
                isNullable: false,
              },
              {
                name:'district',
                type:'varchar',
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
