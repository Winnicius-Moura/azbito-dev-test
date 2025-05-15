import { UniqueEntityID } from '@/shared/value-objects/unique-entity.id';

export abstract class Entity<Props = any> {
  public readonly _id: UniqueEntityID;
  public readonly props: Props;

  protected constructor(props: Props, id?: UniqueEntityID | string) {
    this.props = props;
    this._id = id instanceof UniqueEntityID ? id : new UniqueEntityID(id);
  }

  get id(): string {
    return this._id.toString();
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}