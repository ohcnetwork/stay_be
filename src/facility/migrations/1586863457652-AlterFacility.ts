import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterFacility1586863457652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        const hotelIdColumn = new TableColumn({
            name:"hotelId",
            type:"bigint",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          }); await queryRunner.addColumn("facility",hotelIdColumn);

          const hotelOwnerId = new TableColumn({
              name: 'hotelOwnerId',
              type: 'bigint',
              isNullable: true,
          }); await queryRunner.addColumn("facility",hotelOwnerId);

          const hotelNameColumn = new TableColumn({
            name: 'hotelName',
            type: 'varchar',
          }); await queryRunner.addColumn("facility",hotelNameColumn);

          const districtColumn = new TableColumn({
            name:'district',
            type:'varchar',
          }); await queryRunner.addColumn("facility",districtColumn);

          const facilityDescriptionColumn = new TableColumn({
              name:'facilityDescription',
              type:'varchar',
          }); await queryRunner.addColumn("facility",facilityDescriptionColumn);

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
        await queryRunner.dropColumn("facility","hotelId");
        await queryRunner.dropColumn("facility","hotelOwnerId");
        await queryRunner.dropColumn("facility","hotelName");
        await queryRunner.dropColumn("facility","facilityDescription");
        await queryRunner.dropColumn("facility","district");
        await queryRunner.dropColumn("facility","starCategory");
    }

}
