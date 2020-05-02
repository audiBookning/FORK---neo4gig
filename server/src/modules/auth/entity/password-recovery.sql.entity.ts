import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SqlUser } from '../../users/entity/user.sql.entity';

@Entity({
  name: 'passwordRecoveries',
})
export class PasswordRecovery {
  @IsUUID('4')
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsUUID('4')
  @Column()
  token: string;

  @ManyToOne(
    type => SqlUser,
    user => user.passwordRecoveries,
  )
  user: SqlUser;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
