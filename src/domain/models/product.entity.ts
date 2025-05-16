import { Entity } from '@/shared/domain/entity';

export interface ProductProps {
  name: string;
  price: number;
  establishmentId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class ProductEntity extends Entity<ProductProps> {
  constructor(props: ProductProps, id?: string) {
    ProductEntity.validate(props);
    super(props, id);
    this.props.createdAt = props.createdAt ?? new Date();
    this.props.updatedAt = props.updatedAt ?? undefined
  }

  static validate(props: ProductProps): void {
    if (!props.name) throw new Error('Name is required');
    if (typeof props.price !== 'number' || props.price < 0) throw new Error('Invalid price');
    if (!props.establishmentId) throw new Error('EstablishmentId is required');
  }

  update(data: Partial<Omit<ProductProps, 'establishmentId' | 'createdAt'>>): void {
    if (data.name !== undefined) this.props.name = data.name;
    if (data.price !== undefined) this.props.price = data.price;
    this.touch();
    ProductEntity.validate(this.props);
  }

  private touch() {
    this.props.updatedAt = new Date();
  }

  toJSON() {
    return {
      id: this.id,
      name: this.props.name,
      price: this.props.price,
      establishmentId: this.props.establishmentId,
      createdAt: this.props.createdAt as Date,
      updatedAt: this.props.updatedAt as Date,
    };
  }
}
