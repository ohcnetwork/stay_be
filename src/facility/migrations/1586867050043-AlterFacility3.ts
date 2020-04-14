import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterFacility31586867050043 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","stayDescription");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
