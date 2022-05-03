import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class DateAt {
  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}
