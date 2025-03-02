const fs = require("fs")

class Route {
    mountRoutes(request, response) {
        const { url, method } = request
        if (url === "/users" && method === "GET") {
            const users = [{ user: "user01" }, { user: "user02" }]
            response.writeHead(200, { "content-type": "text/plain" })
            response.end(JSON.stringify(users))
        } else if (url === "/users" && method === "POST") {
            response.writeHead(200, { "content-type": "text/plain" })
            response.end("Hola mundo")
        } else if (url === "/home") {
            const html = fs.readFileSync("./assets/Clase03.mp4")
            response.writeHead(200, { "content-type": "video/mp4" })
            response.end(html)
        } else if (url === "/video") {
            response.writeHead(200, { "content-type": "video/mp4" })
            const stream = fs.createReadStream("./assets/Clase03.mp4")
            stream.pipe(response)
        } else if (url === "/pdf") {
            response.writeHead(200, { "content-type": "application/pdf" })
            const stream = fs.createReadStream("./assets/manual.pdf")
            stream.pipe(response)
        } else {
            response.writeHead(200, { "content-type": "text/plain" })
            response.end(url)
        }
    }
}

module.exports = {
    route: new Route()
}