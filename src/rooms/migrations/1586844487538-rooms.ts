import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class Rooms1586844487538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: 'room',
            columns: [
              {
                name: 'id',
                type: 'bigint',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'hotelId',
                type: 'bigint',
              },
              {
                name: 'title',
                type: 'varchar',
              },
              {
                name:'features',
                type:'varchar',
              },
              {
                name:'description',
                type:'varchar',
              },
              {
                name:'category',
                type:'varchar',
              },
              {
                name: 'beds',
                type:'bigint',
              },
              {
                name: 'photos',
                type: 'varchar',
                isNullable: false,
              },
              {
                name: 'cost',
                type: 'bigint',
                isNullable: false,
              },
              {
                name: 'status',
                type: 'varchar',
                default: '\'AVAILABLE\'',
              },
            ],
          }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "room"`);
    }

}
