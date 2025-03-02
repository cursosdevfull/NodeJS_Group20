function getVideoRoute(request, response) {
    response.writeHead(200, { "content-type": "video/mp4" })
    const stream = fs.createReadStream("./assets/Clase03.mp4")
    stream.pipe(response)
}

module.exports = {
    getVideo: getVideoRoute
}