const fs = require('fs')

function getHomeRoute(request, response) {
    const html = fs.readFileSync('./assets/index.html')
    response.writeHead(200, { 'content-type': 'text/html' })
    response.end(html)
}

function createHome(request, response) {
    response.writeHead(201, { 'content-type': 'text/plain' })
    response.end('Home created successfully')
}

module.exports = {
    getHome: getHomeRoute,
    create: createHome
}