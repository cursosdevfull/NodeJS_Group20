export enum Sex {
    Male = "MALE",
    Female = "FEMALE",
}

export type UserPropsRequired = {
    name: string;
    email: string;
    password: string;
}

export type UserPropsOptional = {
    userId: number
    age: number;
    sex: Sex
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}

export type UserProps = UserPropsRequired & Partial<UserPropsOptional>

export type UserPropsUpdate = Partial<Pick<UserPropsRequired, "name" | "password"> & Omit<UserPropsOptional, "userId">>

export class User {
    private readonly userId: number | undefined;
    private name!: string;
    private email!: string;
    private password!: string;
    private age: number | undefined;
    private sex: Sex | undefined;
    private createdAt: Date | undefined;
    private updatedAt: Date | undefined;
    private deletedAt: Date | undefined;

    constructor(props: UserProps) {
        Object.assign(this, props);
    }

    get properties(): UserProps {
        return {
            userId: this.userId,
            name: this.name,
            email: this.email,
            password: this.password,
            age: this.age,
            sex: this.sex
        }
    }

    update(props: UserPropsUpdate) {
        Object.assign(this, props);
        this.updatedAt = new Date();
    }

    delete() {
        this.deletedAt = new Date();
    }
}