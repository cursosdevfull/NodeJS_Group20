const https = require("https")
const fs = require("fs")
const instance = require("./src/routes/route")
const auth = require("./src/middlewares/authorization.middleware")

const options = {
    key: fs.readFileSync("./certificates/curso-nodejs20.pem"),
    cert: fs.readFileSync("./certificates/curso-nodejs20-public.pem"),
}

const server = https.createServer(options, (request, response) => {
    const valid = auth.authorization(request, response)
    if (!valid) return

    instance.route.mountRoutes(request, response)

})

server.listen(443, () => console.log("Server is running on port 443"))
