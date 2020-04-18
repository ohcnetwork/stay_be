import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createbooking1587030835752 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        return await queryRunner.createTable(new Table({
            name: 'bookings',
            columns: [
                {
                    name: 'book_id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },

                {
                    name: 'checkin',
                    type: 'Date',
                },

                {
                    name: 'checkout',
                    type: 'Date',
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

                  {
                    name: 'userId',
                    type: 'bigint',

                  },

                  {
                    name: 'roomId',
                    type: 'bigint',

                  },

                  {
                    name: 'hotelId',
                    type: 'bigint',

                  },

            ],

        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "bookings"`);
    }

}
