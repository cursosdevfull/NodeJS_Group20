import { BaseEntity } from "@core/entities/base.entity";
import { RoleEntity } from "@role/infrastructure/entities";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "user"})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number | undefined;

    @Column({type: "varchar", length: 50})
    name!: string;

    @Column({type: "varchar", length: 50, unique: true})
    email!: string;

    @Column({type: "varchar", length: 150})
    password!: string;

    @Column({type: "int", nullable: true})
    age: number | undefined;

    @Column({type: "varchar", length: 10, nullable: true})
    sex: string | undefined;

    @Column({type: "varchar", length: 200})
    refreshToken!: string

    @ManyToMany(() => RoleEntity, role => role.users, { eager: true })
    roles!: RoleEntity[];
}