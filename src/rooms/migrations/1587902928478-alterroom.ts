import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class alterroom1587902928478 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("room","features")
        const featureColumn=new TableColumn({name:'features',type:'varchar',isNullable:true,default:null});
        await queryRunner.addColumn("room",featureColumn);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("room","features")
    }

}
