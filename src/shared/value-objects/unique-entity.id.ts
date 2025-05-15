import { v4 as uuid } from 'uuid';

export class UniqueEntityID {
  public readonly value: string;

  constructor(value?: string) {
    this.value = value ?? uuid();
  }

  equals(uuid: UniqueEntityID): boolean {
    return this.value === uuid.value;
  }

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }
}
