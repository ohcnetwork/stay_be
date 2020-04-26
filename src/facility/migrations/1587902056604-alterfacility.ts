import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterfacility1587902056604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","starCategory")
        await queryRunner.dropColumn("facility","facilities")
        const starCategoryColumn = new TableColumn({name: 'starCategory',type: 'bigint',isNullable:true,default:null});
        await queryRunner.addColumn("facility",starCategoryColumn);
        const facilitiesColumn = new TableColumn({name: 'facilities',type:'varchar',isNullable:true,default:null});
        await queryRunner.addColumn("facility",facilitiesColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("facility","starCategory")
        await queryRunner.dropColumn("facility","facilities")
    }

    
}
