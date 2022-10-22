import { ImageUploadServer } from "./mod.ts"

const port = Number(Deno.args[0])

const authenticationMiddlewareFunction = (req, res, next) => {
    console.log(`executing authenticationMiddlewareFunction`)
    const theMeaningOfLife = 42
    if (theMeaningOfLife === 42) {
        next()
    } else {
        console.log("someone might want to update the meaning of life")
    }
}

const activateMiddlewareForSpecificRoutesOptions = [{
    route: "/api/v1/uploadImage",
    middlewareFunction: authenticationMiddlewareFunction
}]

ImageUploadServer.getInstance(port, activateMiddlewareForSpecificRoutesOptions).start()