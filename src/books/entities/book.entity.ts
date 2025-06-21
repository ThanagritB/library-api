import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BookEdition } from './book-edition.entity';
import { BookCategory } from '../enums/book-category.enum';
import { User } from 'src/users/entities/user.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ name: 'published_year', type: 'int' })
  publishedYear: number;

  @Column({ type: 'enum', enum: BookCategory, default: BookCategory.OTHER })
  category: BookCategory;

  @OneToMany(() => BookEdition, (edition) => edition.book, { cascade: true }) // cascade: true mean if book has book edition it will save edition automatically.
  editions: BookEdition[];

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;

  @ManyToOne(() => User, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @ManyToOne(() => User, { nullable: false, onDelete: 'NO ACTION' })
  @JoinColumn({ name: 'updated_by' })
  updatedBy: User;
}
