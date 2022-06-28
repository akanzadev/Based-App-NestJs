import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import { DateAt } from '../../../common/entities';
import { RoleEnum } from '../../../auth/models';
import { RoleToUser } from './role-to-user.entity';

@Entity({ name: 'roles' })
export class Role extends DateAt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.CUSTOMER,
  })
  name: RoleEnum;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image: string;

  @Column({ type: 'varchar', length: 180, nullable: true })
  route: string;

  @OneToMany(() => RoleToUser, (roleToUser) => roleToUser.role)
  roleToUser: RoleToUser[];
}
