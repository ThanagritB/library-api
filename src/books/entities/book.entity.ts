import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookEdition } from './book-edition.entity';
import { BookCategory } from '../enums/book-category.enum';

@Entity()
export class Book {
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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
