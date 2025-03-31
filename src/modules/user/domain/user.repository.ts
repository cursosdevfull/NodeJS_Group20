import type { User } from "@user/domain";
import type { UserByIdResult, UserByPageResult, UserExistsEmailResult, UserGetAllResult, UserSaveResult } from "@user/infrastructure";

export type UserRepository = {
  save(user: User): Promise<UserSaveResult>;
  getById(userId: string): Promise<UserByIdResult>;
  getAll(): Promise<UserGetAllResult>;
  getByPage(page: number, limit: number): Promise<UserByPageResult>;
  existsEmail(email: string): Promise<UserExistsEmailResult>;
};
