import {
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { RequestContext } from '../context/request-context';

export abstract class BaseEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'created_by', type: 'uuid', nullable: true })
  createdById?: string;

  @Column({ name: 'updated_by', type: 'uuid', nullable: true })
  updatedById?: string;

  @BeforeInsert()
  setCreatedBy() {
    const userId = RequestContext.getUserId();
    if (userId) {
      this.createdById = userId;
      this.updatedById = userId;
    }
  }

  @BeforeUpdate()
  setUpdatedBy() {
    const userId = RequestContext.getUserId();
    if (userId) this.updatedById = userId;
  }
}
