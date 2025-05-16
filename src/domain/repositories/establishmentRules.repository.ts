import { Entity } from '@/shared/domain/entity'

export namespace EstablishmentRulesRepository {
  export interface Repository<E extends Entity> {
    findByEstablishmentId(id: string): Promise<E | null>
    save(entity: E): Promise<E>
    update(entity: E): Promise<E>
    delete(id: string): Promise<void>
  }
}
