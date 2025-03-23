import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryColumn()
    userId!: string;

    @Column({ type: "varchar", length: 50 })
    name!: string;

    @Column({ type: "varchar", length: 50 })
    lastname!: string;

    @Column({ type: "varchar", length: 100 })
    email!: string;

    @Column({ type: "varchar", length: 100 })
    password!: string;

    @Column({ type: "int", nullable: true })
    age?: number;

    @Column({ type: "varchar", length: 10, nullable: true })
    sex?: string;

    @Column({ type: "timestamp" })
    createdAt?: Date;

    @Column({ type: "timestamp", nullable: true })
    updatedAt?: Date;

    @Column({ type: "timestamp", nullable: true })
    deletedAt?: Date
}