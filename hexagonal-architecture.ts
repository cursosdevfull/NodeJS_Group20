type GMailOptions = { sender: string, receiver: string, body: string, subject: string, isHTML: boolean }

class GMail {
    /*validateParametersAndSentEmail(options:GMailOptions) {
      this.sent(options.sender, options.receiver, options.body, options.subject, options.isHTML)
    }*/

    sentHTML(sender: string, receiver: string, body: string, subject: string) {
        this.sent(sender, receiver, body, subject, true)
    }

    private sent(sender: string, receiver: string, body: string, subject: string, isHTML: boolean) {
        console.log("sender", sender)
        console.log("receiver", receiver)
        console.log("body", body)
        console.log("subject", subject)
        console.log("isHTML", isHTML)
    }
}

class Office365 {
    sentMessage(receiver: string, body: string, subject: string, options: { sender: string, html: boolean }) {
        console.log("sender", options.sender)
        console.log("receiver", receiver)
        console.log("body", body)
        console.log("subject", subject)
        console.log("isHTML", options.html)
    }
}

const Parameters = {
    Sender: "postmaster@email.com"
}


type RegisterUserPort = {
    sent(sender: string, receiver: string, body: string, subject: string, isHTML: boolean): void
}

class RegisterUserOffice365Adapter implements RegisterUserPort {
    sent(sender: string, receiver: string, body: string, subject: string, isHTML: boolean) {
        const provider = new Office365()
        provider.sentMessage(receiver, body, subject, { sender, html: isHTML })
    }

    getClassName() {
        return "RegisterUserAdapter"
    }
}

class RegisterUserGMailAdapter implements RegisterUserPort {
    sent(sender: string, receiver: string, body: string, subject: string, isHTML: boolean) {
        const provider = new GMail()
        provider.sentHTML(sender, receiver, body, subject)
    }

    getClassName() {
        return "RegisterUserAdapter"
    }
}

class RegisterUser {
    private readonly port: RegisterUserPort

    constructor(port: RegisterUserPort) {
        this.port = port
    }

    register(name: string, lastname: string, email: string) {
        console.log("User registered")
        this.sentEmail(name, lastname, email)
    }

    private sentEmail(name: string, lastname: string, email: string) {
        const body = `
      Welcome <strong>${name} ${lastname}</strong> to our community
    `
        const subject = "Welcome"
        const isHTML = true

        this.port.sent(Parameters.Sender, email, body, subject, isHTML)
    }
}

type Provider = "GMAIL" | "OFFICE365"

const getFactoryAdapter = (provider: Provider): RegisterUserPort => {
    if (provider === "GMAIL") {
        return new RegisterUserGMailAdapter()
    }

    return new RegisterUserOffice365Adapter()
}

const providers = {
    GMAIL: "GMAIL",
    OFFICE365: "OFFICE365"
} as const

//const registerUserPort = new RegisterUserOffice365Adapter()
//const registerUserPort: RegisterUserPort = new RegisterUserGMailAdapter()
const registerUserPort = getFactoryAdapter(providers.GMAIL)
const registerUser = new RegisterUser(registerUserPort)
registerUser.register("John", "Doe", "john.doe@email.com")