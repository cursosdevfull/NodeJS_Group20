function getAllUsers(request, response) {
    const users = [{ user: "user01" }, { user: "user02" }]
    response.writeHead(200, { "content-type": "text/plain" })
    response.end(JSON.stringify(users))
}

function insertUser(request, response) {
    response.writeHead(200, { "content-type": "text/plain" })
    response.end("Hola mundo")
}

module.exports = {
    all: getAllUsers,
    create: insertUser
}