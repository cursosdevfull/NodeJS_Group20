const http = require("https")
const instance = require("./src/routes/route")
const auth = require("./src/middlewares/authorization.middleware")

const server = http.createServer((request, response) => {
    const valid = auth.authorization(request, response)
    if (!valid) return

    instance.route.mountRoutes(request, response)

})

server.listen(3000, () => console.log("Server is running on port 3000"))
