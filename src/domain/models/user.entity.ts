import { Entity } from "@/shared/domain/entity"
import { UserType } from "@/shared/utils/types"

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
    this.props.createdAt = props.createdAt ?? new Date()
    this.props.updatedAt = props.updatedAt ?? undefined
    this.props.type = props.type || UserType.CUSTOMER
  }


  static validate(props: UserProps) {
    if (!props.name || props.name.trim() === '') throw new Error('Name is required');
    if (!props.email.includes('@') || !props.email) throw new Error('Invalid email');
    UserType.validate(props.type)
  }

  update(value: Partial<Pick<UserProps, 'name' | 'email' | 'type'>>): void {
    if (value.name !== undefined) {
      this.props.name = value.name;
    }

    if (value.email !== undefined) {
      this.props.email = value.email;
    }

    if (value.type !== undefined) {
      this.props.type = value.type;
    }

    this.touch();

    UserEntity.validate(this.props);
  }

  private touch() {
    this.props.updatedAt = new Date();
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