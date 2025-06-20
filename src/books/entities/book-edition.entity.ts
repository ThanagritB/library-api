import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { BookFormat } from './book.format.entity';

@Entity()
export class BookEdition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'edition_name' })
  editionName: string;

  @ManyToOne(() => Book, (book) => book.editions, { onDelete: 'CASCADE' })
  book: Book;

  @OneToMany(() => BookFormat, (format) => format.edition, { cascade: true })
  formats: BookFormat[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
