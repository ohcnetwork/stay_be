import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterFacility31586866923137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","star_category");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
