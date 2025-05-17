import { EstablishmentEntity, EstablishmentProps } from '@/domain/models/establishment.entity'
import { EstablishmentType } from '@/shared/utils/types'

describe('EstablishmentEntity', () => {
  let validProps: EstablishmentProps = {
    name: 'Test Establishment',
    ownerId: 'owner-123',
    type: EstablishmentType.LOCAL,
  }

  beforeEach(() => {
    validProps = {
      name: 'Test Product',
      ownerId: 'owner-123',
      type: EstablishmentType.LOCAL,
    };
  });

  it('should create an establishment entity with valid props', () => {
    const establishment = new EstablishmentEntity(validProps)

    expect(establishment.toJSON()).toMatchObject({
      name: validProps.name,
      ownerId: validProps.ownerId,
      type: validProps.type,
    })
    expect(establishment.toJSON().createdAt).toBeInstanceOf(Date)
    expect(establishment.toJSON().updatedAt).toBeUndefined()
  })

  it('should throw an error if name is missing', () => {
    expect(() => {
      new EstablishmentEntity({ ...validProps, name: '' })
    }).toThrow('Name is required')
  })

  it('should throw an error if ownerId is missing', () => {
    expect(() => {
      new EstablishmentEntity({ ...validProps, ownerId: '' })
    }).toThrow('OwnerId is required')
  })

  it('should validate the type using EstablishmentType.validate', () => {
    jest.spyOn(EstablishmentType, 'validate')
    new EstablishmentEntity(validProps)
    expect(EstablishmentType.validate).toHaveBeenCalledWith(validProps.type)
  })

  it('should update the entity and set updatedAt', () => {
    const establishment = new EstablishmentEntity(validProps)
    const newValues = { name: 'Updated Name', type: EstablishmentType.LOCAL }

    establishment.update(newValues)

    expect(establishment.toJSON()).toMatchObject({
      name: newValues.name,
      type: newValues.type,
    })
    expect(establishment.toJSON().updatedAt).toBeInstanceOf(Date)
  })

  it('should throw an error if updated props are invalid', () => {
    const establishment = new EstablishmentEntity(validProps)
    expect(() => {
      establishment.update({ name: '' })
    }).toThrow('Name is required')
  })

  it('should return a JSON representation of the entity', () => {
    const establishment = new EstablishmentEntity(validProps)
    const json = establishment.toJSON()

    expect(json).toMatchObject({
      id: expect.any(String),
      name: validProps.name,
      ownerId: validProps.ownerId,
      type: validProps.type,
      createdAt: expect.any(Date),
      updatedAt: undefined,
    })
  })
})