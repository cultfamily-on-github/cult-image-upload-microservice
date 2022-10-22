import { ImageUploadServer } from "./mod.ts"

const port = 8048 // you can choose any port where the ImageUploadServer shall serve

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

const targetUploadsFolder = "cult-uploads"
const imageUploadServer = await ImageUploadServer.getInstance(port, targetUploadsFolder, activateMiddlewareForSpecificRoutesOptions)
imageUploadServer.start()
