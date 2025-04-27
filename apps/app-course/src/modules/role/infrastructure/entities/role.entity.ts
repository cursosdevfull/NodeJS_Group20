import { UserEntity } from "@user/infrastructure";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "role"})
export class RoleEntity {
    @PrimaryGeneratedColumn()
    roleId!: number;

    @Column({ type: "varchar", length: 50, unique: true })
    name!: string;

    @ManyToMany(()=>UserEntity, user => user.roles)
    @JoinTable()
    users!: UserEntity[];
}