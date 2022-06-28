import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';

import { DateAt } from '../../../common/entities';
import { Role } from './role.entity';
import { User } from './user.entity';

@Entity('user_has_roles')
@Unique(['role', 'user'])
export class RoleToUser extends DateAt {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ManyToOne(() => Role, (role) => role.roleToUser, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_role' })
  role: Role;

  @ManyToOne(() => User, (user) => user.roleToUser, {
    nullable: false,
  })
  @JoinColumn({ name: 'id_user' })
  user: User;
}
