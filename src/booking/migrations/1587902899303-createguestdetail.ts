import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createguestdetail1587902899303 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        return await queryRunner.createTable(new Table({
            name: 'guestdetail',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'bookingsId',
                    type: 'bigint',

                  },

                {
                    name: 'name',
                    type: 'varchar',
                },

                {
                    name: 'age',
                    type: 'bigint',
                },

                {
                    name: 'gender',
                    type: 'varchar',
                },

                {
                    name: 'number',
                    type: 'bigint',
                },


                {

                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    isNullable: false,
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

        await queryRunner.query(`DROP TABLE "guestdetail"`);
    }

}
