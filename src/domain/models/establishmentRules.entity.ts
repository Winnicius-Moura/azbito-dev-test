import { Entity } from '@/shared/domain/entity'

export interface EstablishmentRulesProps {
  establishmentId: string
  picturesLimit: number
  videoLimit: number
  createdAt?: Date
  updatedAt?: Date
}

export class EstablishmentRulesEntity extends Entity<EstablishmentRulesProps> {
  constructor(props: EstablishmentRulesProps, id?: string) {
    EstablishmentRulesEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt ?? new Date()
    this.props.updatedAt = this.props.updatedAt ?? undefined

  }

  static validate(props: EstablishmentRulesProps): void {
    if (!props.establishmentId) throw new Error('EstablishmentId is required')
    if (typeof props.picturesLimit !== 'number' || props.picturesLimit < 0)
      throw new Error('Invalid picturesLimit')
    if (typeof props.videoLimit !== 'number' || props.videoLimit < 0)
      throw new Error('Invalid videoLimit')
  }

  update(value: Partial<Pick<EstablishmentRulesProps, 'establishmentId' | 'videoLimit' | 'picturesLimit'>>): void {
    if (value.establishmentId !== undefined) this.props.establishmentId = value.establishmentId
    if (value.picturesLimit !== undefined) this.props.picturesLimit = value.picturesLimit
    if (value.videoLimit !== undefined) this.props.videoLimit = value.videoLimit

    this.touch()
    EstablishmentRulesEntity.validate(this.props)
  }

  private touch(): void {
    this.props.updatedAt = new Date()
  }


  toJSON() {
    return {
      id: this.id,
      establishmentId: this.props.establishmentId,
      picturesLimit: this.props.picturesLimit,
      videoLimit: this.props.videoLimit,
      createdAt: this.props.createdAt as Date,
      updatedAt: this.props.updatedAt as Date,
    }
  }
}
