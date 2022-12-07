import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserRoles } from './user-roles.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 320, unique: true, nullable: false })
  email: string;

  @Column({ length: 30, nullable: false })
  username: string;

  @Column({ length: 72, nullable: false })
  password: string;

  @Column({
    length: 76,
    default: 'https://avatars.dicebear.com/api/bottts/.svg',
  })
  avatar_url: string;

  @Column({ default: true })
  is_active: boolean;

  @Column({ default: false })
  is_verified: false;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  date_joined: Date;

  @Column({ type: 'timestamptz', nullable: true })
  last_login: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deleted_at: Date;

  @BeforeUpdate()
  updateDates() {
    this.updated_at = new Date();
  }
}
