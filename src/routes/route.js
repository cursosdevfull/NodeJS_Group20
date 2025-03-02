const fs = require("fs")
const userRoute = require("../modules/user/user.route")
const homeRoute = require("../modules/home/home.route")
const videoRoute = require("../modules/video/video.route")
const pdfRoute = require("../modules/pdf/pdf.route")

class Route {
    routes = {
        "/users": {
            "GET": userRoute.all,
            "POST": userRoute.create
        },
        "/home": {
            "GET": homeRoute.getHome,
            "POST": homeRoute.create
        },
        "/video": {
            "GET": videoRoute.getVideo
        },
        "/pdf": {
            "GET": pdfRoute.getPdf
        }
    }

    mountRoutes(request, response) {
        const { url, method } = request

        if (this.routes[url] && this.routes[url][method]) {
            return this.routes[url][method](request, response)
        }

        return homeRoute.create(request, response)
    }
}

module.exports = {
    route: new Route()
}