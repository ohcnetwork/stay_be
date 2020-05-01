import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterBooking1588299010279 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const roomNumber = new TableColumn({name: 'roomNumber',type:'varchar',isNullable:true,default:null});
        await queryRunner.addColumn("bookings",roomNumber);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("bookings","roomNumber");
    }

}
