import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterFacility31586866863070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","cost");
        await queryRunner.dropColumn("facility","rooms_Available");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
