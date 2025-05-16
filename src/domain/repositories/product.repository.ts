import { Entity } from '@/shared/domain/entity';

export namespace ProductRepository {
  export interface Repository<E extends Entity> {
    save(entity: E): Promise<E>;
    findById(id: string): Promise<E | null>;
    update(entity: E): Promise<E>;
    delete(id: string): Promise<void>;
    findAll(): Promise<E[]>;  
  }
}
