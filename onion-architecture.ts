// Domain
type UserRequired = {
    name: string
    lastname: string
    email: string
    password: string
}

type UserOptional = {
    userId: string
    age: number
    sex: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

type UserProps = UserRequired & Partial<UserOptional>
type UserUpdateProps = Partial<Omit<UserRequired, "email"> & Pick<UserOptional, "age" | "sex">>

class User {
    private readonly userId!: string
    private name!: string
    private lastname!: string
    private email!: string
    private age: number | undefined
    private sex: string | undefined
    private password!: string
    private readonly createdAt!: Date
    private updatedAt: Date | undefined
    private deletedAt: Date | undefined

    constructor(props: UserProps) {
        Object.assign(this, props)

        if (!props.createdAt) this.createdAt = new Date()
        if (!props.userId) this.userId = Date.now().toString()
    }

    properties() {
        return {
            userId: this.userId,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            age: this.age,
            sex: this.sex,
            password: this.password,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            deletedAt: this.deletedAt
        }
    }

    update(props: UserUpdateProps) {
        Object.assign(this, props)
        this.updatedAt = new Date()
    }

    delete() {
        this.deletedAt = new Date()
    }

    isAdult() {
        return this.age ? this.age >= 18 : false
    }

    getCompany() {
        if (this.email.match(/company01\.$/i)) return "company01"
        if (this.email.match(/company02\.$/i)) return "company02"

        return "company not found"
    }

    updatePassword(password: string) {
        this.password = password
    }
}

type UserRepository = {
    existsEmail(email: string): Promise<boolean>
    insert(user: User): Promise<User>
}

// Infrastructure

class UserInfrastructure implements UserRepository {
    async existsEmail(email: string): Promise<boolean> {
        return Math.random() > 0.5 ? true : false
    }

    async insert(user: User) {
        return user
    }
}


// Application

class UserApplication {
    constructor(private readonly repository: UserRepository) { }

    async create(user: User) {
        const existsEmail = await this.repository.existsEmail(user.properties().email)

        if (existsEmail) throw new Error("User exists")

        return await this.repository.insert(user)
    }
}


class UserServiceInfrastructure {
    async generatePasswordHashed(password: string) {
        return `${password}-${Date.now().toString()}`
    }
}

class UserController {
    constructor(private readonly application: UserApplication) { }

    async add(name: string, lastname: string, email: string, password: string) {
        const service = new UserServiceInfrastructure()

        const props: UserProps = {
            name, lastname, email, password: await service.generatePasswordHashed(password)
        }

        const user = new User(props)

        return await this.application.create(user)
    }
}

(async () => {
    const repository: UserRepository = new UserInfrastructure()
    const application = new UserApplication(repository)
    const controller = new UserController(application)

    const user = await controller.add("Luis", "Calderón", "luis.calderon@company.com", "LCalderon")
    console.log("user", user)
})()