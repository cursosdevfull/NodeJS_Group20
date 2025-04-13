import { ResponseByPage } from "@core/responses";
import { User } from "@user/domain/user";

export type UserRepository = {
    save(user: User): Promise<User>;
    findById(userId: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;   
    getAll(): Promise<User[]>;
    getByPage(page: number, limit: number): Promise<ResponseByPage<User>>;
}