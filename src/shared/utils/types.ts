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
}

export enum EstablishmentType {
  SHOPPING = 'shopping',
  LOCAL = 'local',
}

export namespace EstablishmentType {
  export function validate(value: string): EstablishmentType {
    if (!Object.values(EstablishmentType).includes(value as EstablishmentType)) {
      throw new Error(`Invalid user type: ${value}`);
    }
    return value as EstablishmentType
  }
}
