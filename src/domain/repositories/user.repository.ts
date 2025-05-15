import { Entity } from '@/shared/domain/entity';

export namespace UserRepository {
  export interface Repository<E extends Entity> {
    save(entity: E): Promise<E>
    findById(id: string): Promise<E | null>
    update(entity: E): Promise<E>
    // findAll(): Promise<E[]>
    // delete(id: string): Promise<void>;
  }
}
