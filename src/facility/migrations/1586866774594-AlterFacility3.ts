import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterFacility31586866774594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","name");
        await queryRunner.dropColumn("facility","id");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
