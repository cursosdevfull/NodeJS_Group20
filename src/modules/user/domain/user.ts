import { v4 as uuidv4 } from "uuid";

type UserRequired = {
    name: string;
    lastname: string;
    email: string;
    password: string;
}

type UserOptional = {
    userId: string;
    age: number
    sex: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export type UserProps = UserRequired & Partial<UserOptional>;
export type UserUpdateProps = Partial<Omit<UserRequired, "email"> & Pick<UserOptional, "age" | "sex">>

export class User {
    private readonly userId!: string;
    private name!: string;
    private lastname!: string;
    private email!: string;
    private password!: string;
    private age: number | undefined;
    private sex: string | undefined;
    private readonly createdAt!: Date;
    private updatedAt: Date | undefined;
    private deletedAt: Date | undefined;

    constructor(props: UserProps) {
        Object.assign(this, props);

        if (props.createdAt) { this.createdAt = props.createdAt } else {
            this.createdAt = new Date()
        }
        if (!props.userId) this.userId = uuidv4()
    }

    get properties() {
        return {
            userId: this.userId,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            age: this.age,
            sex: this.sex,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt,
        }
    }

    update(props: UserUpdateProps) {
        Object.assign(this, props);
        this.updatedAt = new Date()
    }

    delete() {
        this.deletedAt = new Date()
    }

}