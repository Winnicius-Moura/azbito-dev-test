import { ProductProps, ProductEntity } from '@/domain/models/product.entity'

describe('ProductEntity', () => {
  let validProps: ProductProps = {
    name: 'Test Product',
    price: 100,
    establishmentId: 'establishment-123',
  };

  beforeEach(() => {
    validProps = {
      name: 'Test Product',
      price: 100,
      establishmentId: 'establishment-123',
    };
  });

  it('should create a ProductEntity with valid properties', () => {
    const product = new ProductEntity({ ...validProps });

    expect(product.toJSON()).toMatchObject({
      name: 'Test Product',
      price: 100,
      establishmentId: 'establishment-123',
    });
    expect(product.toJSON().createdAt).toBeInstanceOf(Date);
    expect(product.toJSON().updatedAt).toBeUndefined();
  });

  it('should throw an error if name is missing', () => {
    expect(() => new ProductEntity({ ...validProps, name: '' })).toThrow('Name is required');
  });

  it('should throw an error if price is invalid', () => {
    expect(() => new ProductEntity({ ...validProps, price: -10 })).toThrow('Invalid price');
    expect(() => new ProductEntity({ ...validProps, price: NaN })).toThrow('Invalid price');
  });

  it('should throw an error if establishmentId is missing', () => {
    expect(() => new ProductEntity({ ...validProps, establishmentId: '' })).toThrow('EstablishmentId is required');
  });

  it('should update the product properties and update the updatedAt timestamp', () => {
    const product = new ProductEntity({ ...validProps, name: 'Test Product' });
    const initialUpdatedAt = product.toJSON().updatedAt;

    product.update({ name: 'Updated Product', price: 200 });

    expect(product.toJSON()).toMatchObject({
      name: 'Updated Product',
      price: 200,
      establishmentId: 'establishment-123',
    });
    expect(product.toJSON().updatedAt).not.toBe(initialUpdatedAt);
  });

  it('should not allow updating establishmentId or createdAt', () => {
    const product = new ProductEntity({ ...validProps });

    product.update({ establishmentId: 'new-id' } as any);
    product.update({ createdAt: new Date() } as any);

    expect(product.toJSON().establishmentId).toBe('establishment-123');
    expect(product.toJSON().createdAt).toBeInstanceOf(Date);
  });

  it('should validate properties during update', () => {
    const product = new ProductEntity(validProps);

    expect(() => product.update({ price: -50 })).toThrow('Invalid price');
    expect(() => product.update({ name: '' })).toThrow('Name is required');
  });

  it('should return a JSON representation of the product', () => {
    const product = new ProductEntity(validProps);
    const json = product.toJSON();

    expect(json).toEqual({
      id: product.id,
      name: validProps.name,
      price: validProps.price,
      establishmentId: validProps.establishmentId,
      createdAt: product.props.createdAt,
      updatedAt: product.props.updatedAt,
    });
    expect(json.createdAt).toBeInstanceOf(Date);
    expect(json.updatedAt).toBeUndefined();
  });

});