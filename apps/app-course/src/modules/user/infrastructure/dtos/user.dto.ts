import { Role, Sex, User } from "@user/domain";
import { plainToInstance } from 'class-transformer';
import { UserEntity } from "../entities";

export class UserDto {
    static fromDomainToData(domain: User | User[]): UserEntity | UserEntity[] {
        if(Array.isArray(domain)) {
            return domain.map(user => plainToInstance(UserEntity, user.properties)) as UserEntity[];
        }

        return plainToInstance(UserEntity, domain.properties) as UserEntity;
    }

    static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
        if(Array.isArray(data)) {
            return data.map(entity => new User(
                {
                    userId: entity.userId, 
                    name: entity.name, 
                    email: entity.email, 
                    password: entity.password, 
                    age: entity.age, 
                    sex: entity.sex as Sex, 
                    createdAt: entity.createdAt, 
                    updatedAt: entity.updatedAt, 
                    deletedAt: entity.deletedAt,
                    refreshToken: entity.refreshToken,
                    roles: entity.roles.map(role => {
                        const instance = new Role()
                        instance.roleId = role.roleId;
                        instance.name = role.name;
                        return instance;
                    })
                }
            )) as User[];
        }

        return new User({
            userId: data.userId,
            name: data.name,
            email: data.email,
            password: data.password,
            age: data.age,
            sex: data.sex as Sex,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            deletedAt: data.deletedAt,
            refreshToken: data.refreshToken,
            roles: data.roles.map(role => {
                const instance = new Role()
                instance.roleId = role.roleId;
                instance.name = role.name;
                return instance;
            })
        }) as User;
    }
}