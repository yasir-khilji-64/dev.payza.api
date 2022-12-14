import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoryType } from './category-type.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 30, nullable: false, unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ length: 7, default: '#386cac' })
  color: string;

  @Column({ nullable: false })
  category_type_id: string;

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

  @ManyToOne(() => CategoryType, (category_type) => category_type.categories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_type_id' })
  category_type: CategoryType;
}
