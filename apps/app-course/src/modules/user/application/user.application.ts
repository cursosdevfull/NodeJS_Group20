import { ApplicationException } from "@core/exceptions";
import { removeEmptyProperties } from "@core/services";
import { User, UserPropsUpdate, UserRepository } from "@user/domain";

export class UserApplication {
    constructor(private readonly repository: UserRepository) {}

    async create(user: User) {
        return await this.repository.save(user);
    }

    async update(userId: number, props: UserPropsUpdate) {
        const user = await this.repository.findById(userId);
        if (!user) {
            const objError = new ApplicationException("User not found");
            objError.status = 404;
            throw objError;
        }

        const propsWithEmpties = removeEmptyProperties(props);

        user.update(propsWithEmpties);
        return await this.repository.save(user);
    }

    async delete(userId: number) {
        const user = await this.repository.findById(userId);
        if (!user) {
            const objError = new ApplicationException("User not found");
            objError.status = 404;
            throw objError;
        }

        user.delete();
        return await this.repository.save(user);
    }

    async findById(userId: number) {
        const user = await this.repository.findById(userId);
        if (!user) {
            const objError = new ApplicationException("User not found");
            objError.status = 404;
            throw objError;
        }

        return user;
    }

    async getByPage(page: number, limit: number) {
        return await this.repository.getByPage(page, limit);
    }

    async getAll() {
        return await this.repository.getAll();
    }


}