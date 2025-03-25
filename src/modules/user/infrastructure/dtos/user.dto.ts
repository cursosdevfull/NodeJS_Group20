import { User, type UserProps } from "../../domain";
import { UserEntity } from "../entities";

export class UserDto {
  static fromDomainToData(domain: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(domain)) {
      return domain.map((item) =>
        UserDto.fromDomainToData(item),
      ) as UserEntity[];
    }

    const userEntity = new UserEntity();
    userEntity.userId = domain.properties.userId;
    userEntity.name = domain.properties.name;
    userEntity.lastname = domain.properties.lastname;
    userEntity.email = domain.properties.email;
    userEntity.password = domain.properties.password;
    userEntity.age = domain.properties.age;
    userEntity.sex = domain.properties.sex;
    userEntity.createdAt = domain.properties.createdAt;
    userEntity.updatedAt = domain.properties.updatedAt;
    userEntity.deletedAt = domain.properties.deletedAt;

    return userEntity;
  }

  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((item) => UserDto.fromDataToDomain(item)) as User[];
    }

    const props: UserProps = {
      userId: data.userId,
      name: data.name,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      age: data.age,
      sex: data.sex,
    };

    return new User(props);
  }
}
