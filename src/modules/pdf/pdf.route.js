const fs = require('fs')

function getPdfRoute(request, response) {
    response.writeHead(200, { "content-type": "application/pdf" })
    const stream = fs.createReadStream("./assets/manual.pdf")
    stream.pipe(response)
}

module.exports = {
    getPdf: getPdfRoute
}