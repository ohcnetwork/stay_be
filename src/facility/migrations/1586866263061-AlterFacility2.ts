import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterFacility21586866263061 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const latitudeColumn = new TableColumn({
            name:'latitude',
            type:'varchar',
        }); await queryRunner.addColumn("facility",latitudeColumn);

        const longitudeColumn = new TableColumn({
            name:'longitude',
            type:'varchar',
        }); await queryRunner.addColumn("facility",longitudeColumn);

        const starCategoryColumn = new TableColumn({
            name:'starCategory',
            type:'bigint',
        }); await queryRunner.addColumn("facility",starCategoryColumn);

    
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","latitude");
        await queryRunner.dropColumn("facility","longitude");
        await queryRunner.dropColumn("facility","starCategory");
    }

}
