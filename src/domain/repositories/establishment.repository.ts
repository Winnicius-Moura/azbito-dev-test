import { Entity } from '@/shared/domain/entity';

export namespace EstablishmentRepository {
  export interface Repository<E extends Entity> {
    save(entity: E): Promise<E>
    findById(id: string): Promise<E | null>
    update(entity: E): Promise<E>
    // findAll(): Promise<E[]>
    // findByType(type: string): Promise<E[]>
    // delete(id: string): Promise<void>
  }
}
