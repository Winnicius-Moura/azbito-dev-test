import { Entity } from "@/shared/domain/entity"

export enum UserType {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

export interface UserProps {
  name: string
  email: string
  type: UserType
  createdAt?: Date
  updatedAt?: Date
}

export class UserEntity extends Entity<UserProps> {
  constructor(
    public readonly props: UserProps,
    id?: string,
  ) {
    UserEntity.validate(props)
    super(props, id)
    this.props.createdAt = this.props.createdAt || new Date()
    this.props.updatedAt = this.props.updatedAt || new Date()
    this.props.type = this.props.type || UserType.CUSTOMER
  }

  static validate(props: UserProps) {
    if (!props.name) throw new Error('Name is required');
    if (!props.email.includes('@')) throw new Error('Invalid email');
    if (!Object.values(UserType).includes(props.type)) {
      throw new Error('Invalid user type');
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.props.name,
      email: this.props.email,
      type: this.props.type,
      createdAt: this.props.createdAt as Date,
      updatedAt: this.props.updatedAt as Date,
    }
  }

}