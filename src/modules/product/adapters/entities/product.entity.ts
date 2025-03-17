import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "product" })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    productId: number | undefined

    @Column({ type: "varchar", length: 100 })
    name!: string

    @Column()
    price!: number

    @Column({ type: "text" })
    description!: string

    @Column()
    stock!: number

    @Column()
    createdAt!: Date

    @Column({ type: "timestamp", nullable: true })
    updatedAt: Date | undefined

    @Column({ type: "timestamp", nullable: true })
    deletedAt: Date | undefined

}