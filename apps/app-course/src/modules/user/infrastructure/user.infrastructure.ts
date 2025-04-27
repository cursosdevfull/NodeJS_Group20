import { DatabaseBootstrap } from "@bootstrap/database.bootstrap";
import { ResponseByPage } from "@core/responses";
import { User, UserRepository } from "@user/domain";
import { IsNull } from "typeorm";
import { UserDto } from "./dtos";
import { UserEntity } from "./entities";
import { DatabaseException } from "@core/exceptions";
import { RoleEntity } from "@role/infrastructure/entities";
import { plainToInstance } from "class-transformer";

export class UserInfrastructure implements UserRepository {
    async save(user: User): Promise<User> {
        try {
            const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
            const userEntity = UserDto.fromDomainToData(user) as UserEntity;
            const userSaved = await repository.save(userEntity);
            userSaved.roles = user.properties.roles.map(role => plainToInstance(RoleEntity, role)) as RoleEntity[];

            return UserDto.fromDataToDomain(userSaved) as User;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            const objError = new DatabaseException(error.message);
            objError.stack = error.stack ?? "";
            throw objError
        }
    }

    async findById(userId: number): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
            const userEntity = await repository.findOne({ where: { userId, deletedAt: IsNull() } });
            return userEntity ? UserDto.fromDataToDomain(userEntity) as User : null;
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            const objError = new DatabaseException("error.message");
            objError.stack = error.stack ?? "";
            throw objError
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        try {
            const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
            const userEntity = await repository.findOne({ where: { email, deletedAt: IsNull() } });
            return userEntity ? UserDto.fromDataToDomain(userEntity) as User : null;
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            const objError = new DatabaseException(error.message);
            objError.stack = error.stack ?? "";
            throw objError
        }
    }
    async getAll(): Promise<User[]> {
        try {
            const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
            const userEntities = await repository.find({ where: { deletedAt: IsNull() } /*, relations: {roles: true} */});
            return UserDto.fromDataToDomain(userEntities) as User[];
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            const objError = new DatabaseException(error.message);
            objError.stack = error.stack ?? "";
            throw objError
        }
    }
    async getByPage(page: number, limit: number): Promise<ResponseByPage<User>> {
        try {
            const repository = DatabaseBootstrap.datasource.getRepository(UserEntity);
            const [users, total] = await repository.findAndCount({
                where: { deletedAt: IsNull() },
                skip: (page - 1) * limit,
                take: limit,
            });

            return {
                total,
                page,
                limit,
                data: UserDto.fromDataToDomain(users) as User[]
            }
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
        } catch (error: any) {
            const objError = new DatabaseException(error.message);
            objError.stack = error.stack ?? "";
            throw objError
        }
    }

}