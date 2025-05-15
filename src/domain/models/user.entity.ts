import { Entity } from "@/shared/domain/entity"

export enum UserType {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

export namespace UserType {
  export function fromString(value: string): UserType {
    if (!Object.values(UserType).includes(value as UserType)) {
      throw new Error(`Invalid user type: ${value}`);
    }
    return value as UserType;
  }

  export function isValid(value: string): value is UserType {
    return Object.values(UserType).includes(value as UserType);
  }

  export const values = (): UserType[] => Object.values(UserType) as UserType[];
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
    // UserEntity.validate(props)
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