import {MigrationInterface, QueryRunner} from "typeorm";

export class userRole31656438663395 implements MigrationInterface {
    name = 'userRole31656438663395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_1337dbe1a4233b5c4b482f981ea\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_3fd6d8f71742f27803b47027368\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP COLUMN \`roleId\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_c30132e091fdab301758c1205d3\` FOREIGN KEY (\`id_role\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_9162e69c2882814e6efd38eb0fc\` FOREIGN KEY (\`id_user\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_9162e69c2882814e6efd38eb0fc\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_c30132e091fdab301758c1205d3\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD \`roleId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_3fd6d8f71742f27803b47027368\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_1337dbe1a4233b5c4b482f981ea\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
