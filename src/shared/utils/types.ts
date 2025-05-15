export enum UserType {
  OWNER = 'owner',
  CUSTOMER = 'customer',
}

export namespace UserType {
  export function validate(value: string): UserType {
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