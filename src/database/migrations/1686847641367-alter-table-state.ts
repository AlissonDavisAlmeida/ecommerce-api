import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableState1686847641367 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE state
        ADD COLUMN uf VARCHAR(2) NOT NULL;
    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        ALTER TABLE state
        DROP COLUMN uf;
    
    `);
  }

}
