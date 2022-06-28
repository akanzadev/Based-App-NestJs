import {MigrationInterface, QueryRunner} from "typeorm";

export class init1656438222219 implements MigrationInterface {
    name = 'init1656438222219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(180) NOT NULL, \`name\` varchar(90) NOT NULL, \`lastname\` varchar(90) NOT NULL, \`phone\` varchar(90) NOT NULL, \`image\` varchar(255) NULL, \`password\` varchar(90) NOT NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user_has_roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` varchar(36) NOT NULL, \`id_role\` int NOT NULL, \`id_user\` int NOT NULL, \`roleId\` int NULL, \`userId\` int NULL, UNIQUE INDEX \`IDX_9b5b1c22fe7fea2a1993129db2\` (\`id_role\`, \`id_user\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`id\` int NOT NULL AUTO_INCREMENT, \`name\` enum ('RESTAURANT', 'DELIVERY', 'CUSTOMER', 'SUPER_ADMIN') NOT NULL DEFAULT 'CUSTOMER', \`image\` varchar(255) NULL, \`route\` varchar(180) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_1337dbe1a4233b5c4b482f981ea\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` ADD CONSTRAINT \`FK_3fd6d8f71742f27803b47027368\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_3fd6d8f71742f27803b47027368\``);
        await queryRunner.query(`ALTER TABLE \`user_has_roles\` DROP FOREIGN KEY \`FK_1337dbe1a4233b5c4b482f981ea\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_9b5b1c22fe7fea2a1993129db2\` ON \`user_has_roles\``);
        await queryRunner.query(`DROP TABLE \`user_has_roles\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
