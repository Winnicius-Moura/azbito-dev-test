import { Entity } from '@/shared/domain/entity'
import { EstablishmentType } from '@/shared/utils/types'

export interface EstablishmentProps {
  name: string
  ownerId: string
  type: EstablishmentType
  createdAt?: Date
  updatedAt?: Date
}

export class EstablishmentEntity extends Entity<EstablishmentProps> {
  constructor(props: EstablishmentProps, id?: string) {
    EstablishmentEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.updatedAt ?? new Date()
  }

  static validate(props: EstablishmentProps): void {
    if (!props.name) throw new Error('Name is required')
    if (!props.ownerId) throw new Error('OwnerId is required')
    EstablishmentType.validate(props.type)
  }

  update(value: Partial<Pick<EstablishmentProps, 'name' | 'type'>>): void {
    if (value.name !== undefined) this.props.name = value.name
    if (value.type !== undefined) this.props.type = value.type
    this.touch()
    EstablishmentEntity.validate(this.props)
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }

  toJSON() {
    return {
      id: this.id,
      name: this.props.name,
      ownerId: this.props.ownerId,
      type: this.props.type,
      createdAt: this.props.createdAt ?? new Date(),
      updatedAt: this.props.updatedAt ?? new Date(),
    } as Required<{ id: string } & EstablishmentProps>
  }
}
