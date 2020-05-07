import {MigrationInterface, QueryRunner} from "typeorm";

export class alterdate1588823568413 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        
            await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "checkin" TYPE  "date"  USING "checkin"::"date" `);
            await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "checkin" SET NOT NULL`);
            await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "checkout" TYPE "date"   USING "checkout"::"date" `);
            await queryRunner.query(`ALTER TABLE "bookings" ALTER COLUMN "checkout" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("bookings","checkin");
        await queryRunner.dropColumn("bookings","checkout");
    }

}

