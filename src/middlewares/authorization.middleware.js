function authorization(request, response) {
    const headers = request.headers
    const authorization = headers["authorization"]

    const existsHeaderAuthorization = !!authorization
    const containsWordBearer = existsHeaderAuthorization && authorization.startsWith("Bearer")
    const hasTwoParts = containsWordBearer && authorization.split(" ").length === 2
    const tokenValid = hasTwoParts && authorization.split(" ")[1] === "Token"

    if (!existsHeaderAuthorization || !containsWordBearer || !hasTwoParts || !tokenValid) {
        response.writeHead(401, { "content-type": "text/html" })
        response.end("<h1>User isn't authenticated</h1>")
        return false
    }

    return true
}

module.exports = {
    authorization
}