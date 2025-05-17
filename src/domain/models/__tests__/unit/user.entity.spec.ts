import { UserEntity } from "@/domain/models/user.entity";
import { UserType } from "@/shared/utils/types";

describe("UserEntity", () => {
  const validUserProps = {
    name: "John Doe",
    email: "john.doe@example.com",
    type: UserType.CUSTOMER,
  };

  it("should create a user entity with valid properties", () => {
    const user = new UserEntity(validUserProps);

    expect(user.props.name).toBe(validUserProps.name);
    expect(user.props.email).toBe(validUserProps.email);
    expect(user.props.type).toBe(validUserProps.type);
    expect(user.props.createdAt).toBeInstanceOf(Date);
    expect(user.props.updatedAt).toBeUndefined();
  });

  it("should throw an error if name is missing", () => {
    expect(() => {
      new UserEntity({ ...validUserProps, name: "" });
    }).toThrow("Name is required");
  });

  it("should throw an error if email is invalid", () => {
    expect(() => {
      new UserEntity({ ...validUserProps, email: "invalid-email" });
    }).toThrow("Invalid email");
  });

  it("should update user properties and validate them", () => {
    const user = new UserEntity(validUserProps);

    user.update({ name: "Jane Doe", email: "jane.doe@example.com", type: UserType.OWNER });

    expect(user.props.name).toBe("Jane Doe");
    expect(user.props.email).toBe("jane.doe@example.com");
    expect(user.props.type).toBe(UserType.OWNER);
    expect(user.props.updatedAt).toBeInstanceOf(Date);
  });

  it("should not update properties if no values are provided", () => {
    const user = new UserEntity(validUserProps);
    const initialUpdatedAt = user.props.updatedAt;

    user.update({});

    expect(user.props.name).toBe(validUserProps.name);
    expect(user.props.email).toBe(validUserProps.email);
    expect(user.props.type).toBe(validUserProps.type);
    expect(Math.abs(user.props.updatedAt!.getTime() - initialUpdatedAt!.getTime())).toBeLessThan(10);
  });

  it("should return a JSON representation of the user entity", () => {
    const user = new UserEntity(validUserProps);
    const json = user.toJSON();

    expect(json).toEqual({
      id: user.id,
      name: validUserProps.name,
      email: validUserProps.email,
      type: validUserProps.type,
      createdAt: user.props.createdAt,
      updatedAt: user.props.updatedAt,
    });
  });
});