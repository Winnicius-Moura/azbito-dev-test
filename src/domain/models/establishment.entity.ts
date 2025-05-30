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
    this.props.updatedAt = this.props.updatedAt ?? undefined
  }

  static validate(props: EstablishmentProps): void {
    if (!props.name || props.name.trim() === '') throw new Error('Name is required')
    if (!props.ownerId || props.ownerId.trim() === '') throw new Error('OwnerId is required')
    EstablishmentType.validate(props.type)
  }

  update(value: Partial<Pick<EstablishmentProps, 'name' | 'type' | 'ownerId'>>): void {
    if (value.name !== undefined) this.props.name = value.name
    if (value.type !== undefined) this.props.type = value.type
    if (value.ownerId !== undefined) this.props.ownerId = value.ownerId

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
      createdAt: this.props.createdAt as Date,
      updatedAt: this.props.updatedAt as Date,
    } as Required<{ id: string } & EstablishmentProps>
  }
}
