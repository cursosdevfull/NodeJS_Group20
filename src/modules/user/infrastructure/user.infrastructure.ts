import { DatabaseBootstrap } from "@bootstrap";
import { DatabaseException, type ResponsePage } from "@core";
import { User, type UserRepository } from "@user/domain";
import { UserDto, UserEntity } from "@user/infrastructure";
import { type Result, err, ok } from "neverthrow"
import { IsNull } from "typeorm";

export type UserSaveResult = Result<User, DatabaseException>;
export type UserByIdResult = Result<User | null, DatabaseException>;
export type UserGetAllResult = Result<User[], DatabaseException>;
export type UserByPageResult = Result<ResponsePage<User>, DatabaseException>;
export type UserExistsEmailResult = Result<boolean, DatabaseException>;

export class UserInfrastructure implements UserRepository {
  async save(user: User): Promise<UserSaveResult> {
    try {
      const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
      const userEntity = UserDto.fromDomainToData(user) as UserEntity;

      const userReturned = await repository.save(userEntity);

      return ok(UserDto.fromDataToDomain(userReturned) as User);
    } catch (error) {
      const exception = new DatabaseException("Error saving user");
      exception.stack = error ? (error as string) : ""
      return err(exception)
    }

  }

  async getById(userId: string): Promise<UserByIdResult> {
    try {
      const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
      const userReturned = await repository.findOne({
        where: { userId, deletedAt: IsNull() },
      });

      if (!userReturned) return ok(null);

      return ok(UserDto.fromDataToDomain(userReturned) as User);
    } catch (error) {
      const exception = new DatabaseException("Error getById user");
      exception.stack = error ? (error as string) : ""
      return err(exception)
    }

  }

  async getAll(): Promise<UserGetAllResult> {
    try {
      const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
      const usersReturned = await repository.find({
        where: { deletedAt: IsNull() },
      });
      return ok(UserDto.fromDataToDomain(usersReturned) as User[]);
    } catch (error) {
      const exception = new DatabaseException("Error getAll user");
      exception.stack = error ? (error as string) : ""
      return err(exception)
    }

  }

  async getByPage(page: number, limit: number): Promise<UserByPageResult> {
    try {
      const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);

      const [usersReturned, total] = await repository.findAndCount({
        where: { deletedAt: IsNull() },
        skip: (page - 1) * limit,
        take: limit,
      });

      return ok({ results: usersReturned.map((item) => new User(item)), total });
    } catch (error) {
      const exception = new DatabaseException("Error getByPage user");
      exception.stack = error ? (error as string) : ""
      return err(exception)
    }

  }

  async existsEmail(email: string): Promise<UserExistsEmailResult> {
    try {
      const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);

      const userMatched = await repository.findOne({
        where: { email, deletedAt: IsNull() },
      });

      return ok(!!userMatched);
    } catch (error) {
      const exception = new DatabaseException("Error getByPage user");
      exception.stack = error ? (error as string) : ""
      return err(exception)
    }

  }
}
