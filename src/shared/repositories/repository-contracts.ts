import { Entity } from '@/shared/domain/entity'

export interface RepositoryInterface<E extends Entity> {
  save(entity: E): Promise<E>
  findById(id: string): Promise<E | null>
  // findAll(): Promise<E[]>;
  // update(entity: E): Promise<void>;
  // delete(id: string): Promise<void>;
}
