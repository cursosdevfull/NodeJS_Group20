const http = require("http")

const server = http.createServer((request, response) => {
    console.log("request received")
/*     response.writeHead(200, {"content-type": "application/json"})
    response.write("{name: 'Luis', lastname: 'Zapata'}") */
    response.writeHead(200, {"content-type": "text/plain; charset=utf-8"})
    response.write("Hola mundo")
    response.write("¿cómo estás?")
    //response.writeHead(201, {"content-type": "application/json"})
    response.write("¿todo bien?")
    response.end("Answer soon")
    //response.write("Other answer")
})

server.listen(3000, () => console.log("Server is running on port 3000"))
