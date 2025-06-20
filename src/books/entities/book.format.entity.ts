import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BookEdition } from './book-edition.entity';

@Entity()
export class BookFormat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'format_type' })
  formatType: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @ManyToOne(() => BookEdition, (edition) => edition.formats, {
    onDelete: 'CASCADE',
  })
  edition: BookEdition;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
