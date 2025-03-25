import type { User, UserRepository, UserUpdateProps } from "../domain";

export class UserApplication {
  constructor(private readonly repository: UserRepository) {}

  async create(user: User) {
    const { email } = user.properties;

    const existsEmail = await this.repository.existsEmail(email);

    if (existsEmail) {
      throw new Error("Email already exists");
    }

    return await this.repository.save(user);
  }

  async update(userId: string, props: UserUpdateProps) {
    const user = await this.repository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.update(props);
    return await this.repository.save(user);
  }

  async delete(userId: string) {
    const user = await this.repository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.delete();
    return await this.repository.save(user);
  }

  async getById(userId: string) {
    const user = await this.repository.getById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  async getAll() {
    return await this.repository.getAll();
  }

  async getByPage(page: number, limit: number) {
    return await this.repository.getByPage(page, limit);
  }
}
