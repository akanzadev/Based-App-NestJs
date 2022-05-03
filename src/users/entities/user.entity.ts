import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { DateAt } from './dateAt.entity';

@Entity()
export class User extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 180, nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 90, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 90, nullable: false })
  lastname: string;

  @Column({ type: 'varchar', length: 90, nullable: false, unique: true })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 90, nullable: false })
  password: string;
}
