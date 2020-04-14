import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterFacility11586866171251 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","latitude");
        await queryRunner.dropColumn("facility","longitude");
        await queryRunner.dropColumn("facility","name");
        await queryRunner.dropColumn("facility","id");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
