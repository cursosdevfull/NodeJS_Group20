import { ApplicationEmailExistsException, ApplicationUserNotFoundException, type ResponsePage } from "@core";
import type { User, UserRepository, UserUpdateProps } from "@user/domain";

export class UserApplication {
  constructor(private readonly repository: UserRepository) { }

  async create(user: User) {
    const { email } = user.properties;

    const existsEmailResult = await this.repository.existsEmail(email);

    if (existsEmailResult.isErr()) {
      return existsEmailResult.error
    }

    const existsEmail = existsEmailResult.value as boolean;

    if (existsEmail) {
      const exception = new ApplicationEmailExistsException("Email exists");
      exception.name = "Email found";
      return exception

    }

    const userCreatedResult = await this.repository.save(user);

    if (userCreatedResult.isErr()) {
      return userCreatedResult.error
    }

    return userCreatedResult.value as User;
  }

  async update(userId: string, props: UserUpdateProps) {
    const userResult = await this.repository.getById(userId);

    if (userResult.isErr()) {
      return userResult.error
    }

    const user = userResult.value as User;

    user.update(props);
    const userUpdateResult = await this.repository.save(user);

    if (userUpdateResult.isErr()) {
      return userUpdateResult.error
    }

    return userUpdateResult.value as User;
  }

  async delete(userId: string) {
    const userResult = await this.repository.getById(userId);

    if (userResult.isErr()) {
      return userResult.error
    }

    const user = userResult.value as User;

    if (!user) {
      const exception = new ApplicationUserNotFoundException("User not found");
      exception.name = "User not found";
      return exception
    }

    user.delete();
    const userDeletedResult = await this.repository.save(user);

    if (userDeletedResult.isErr()) {
      return userDeletedResult.error
    }
    return userDeletedResult.value as User;
  }

  async getById(userId: string) {
    const userResult = await this.repository.getById(userId);

    if (userResult.isErr()) {
      return userResult.error
    }

    const user = userResult.value as User;

    if (!user) {
      const exception = new ApplicationUserNotFoundException("User not found");
      exception.name = "User not found";
      return exception
    }

    return user;
  }

  async getAll() {
    const usersResult = await this.repository.getAll();

    if (usersResult.isErr()) {
      return usersResult.error
    }

    return usersResult.value as User[];
  }

  async getByPage(page: number, limit: number) {
    const usersByPageResult = await this.repository.getByPage(page, limit);

    if (usersByPageResult.isErr()) {
      return usersByPageResult.error
    }

    return usersByPageResult.value as ResponsePage<User>;
  }
}
