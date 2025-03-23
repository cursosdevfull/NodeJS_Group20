import { User } from "./user";
import { ResponsePage } from '../../../core';

export type UserRepository = {
    save(user: User): Promise<User>;
    getById(userId: string): Promise<User | null>;
    getAll(): Promise<User[]>;
    getByPage(page: number, limit: number): Promise<ResponsePage<User>>;
    existsEmail(email: string): Promise<boolean>;
}