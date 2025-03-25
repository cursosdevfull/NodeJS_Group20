import { IsNull } from "typeorm";
import { DatabaseBootstrap } from "../../../bootstrap";
import type { ResponsePage } from "../../../core";
import { User, type UserRepository } from "../domain";
import { UserDto } from "./dtos";
import { UserEntity } from "./entities/user.entity";

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<User> {
    const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
    const userEntity = UserDto.fromDomainToData(user) as UserEntity;

    const userReturned = await repository.save(userEntity);

    return UserDto.fromDataToDomain(userReturned) as User;
  }

  async getById(userId: string): Promise<User | null> {
    const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
    const userReturned = await repository.findOne({
      where: { userId, deletedAt: IsNull() },
    });

    if (!userReturned) return null;

    return UserDto.fromDataToDomain(userReturned) as User;
  }

  async getAll(): Promise<User[]> {
    const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
    const usersReturned = await repository.find({
      where: { deletedAt: IsNull() },
    });
    return UserDto.fromDataToDomain(usersReturned) as User[];
  }

  async getByPage(page: number, limit: number): Promise<ResponsePage<User>> {
    const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);

    const [usersReturned, total] = await repository.findAndCount({
      where: { deletedAt: IsNull() },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { results: usersReturned.map((item) => new User(item)), total };
  }

  async existsEmail(email: string): Promise<boolean> {
    const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);

    const userMatched = await repository.findOne({
      where: { email, deletedAt: IsNull() },
    });

    return !!userMatched;
  }
}
