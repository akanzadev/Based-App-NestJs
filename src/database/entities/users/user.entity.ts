import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

import { DateAt } from '../../../common/entities/dateAt.entity';
import { RoleToUser } from './role-to-user.entity';

@Entity({ name: 'users' })
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

  @Exclude()
  @Column({ type: 'varchar', length: 90 })
  password: string;

  @OneToMany(() => RoleToUser, (roleToUser) => roleToUser.user)
  roleToUser: RoleToUser[];
}
