import { IsUUID } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entity/user.entity';

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

  @ManyToOne(type => User, user => user.passwordRecoveries)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
