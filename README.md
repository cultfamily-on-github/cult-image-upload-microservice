# Image Upload Server
After having spent many hours looking for a simple and actually working image upload solution for Deno, I decided to program and publish this module. 

This [Deno Module](https://deno.land/x/cult_image_upload_server) supports the [cultmagazine.org](https://cultmagazine.org).  


## Usage

### Basic
```ts
import { ImageUploadServer } from "https://deno.land/x/cult_image_upload_server/mod.ts"

const port = 8048 // you can choose any port where the ImageUploadServer shall serve

ImageUploadServer.getInstance(port).start()

// visit http://localhost:8048 and do the obvious :) enjoy be happy and support the CULT

```

### Advanced 
If you want to use an authentication function for specific routes, you can do it as follows:
```ts
import { ImageUploadServer } from "https://deno.land/x/cult_image_upload_server/mod.ts"

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

ImageUploadServer.getInstance(port, activateMiddlewareForSpecificRoutesOptions).start()

// visit http://localhost:8048 and do the obvious :) enjoy be happy and support the CULT

```

## Learnings During This Project
Formidable is formidable.  
https://github.com/node-formidable/formidable#api

https://stackoverflow.com/questions/29157732/how-to-send-image-to-client-using-express-node-js


## Donations
If you like my work, please consider donating some Ether, CULT or RVLT to 0x9E972a43B3B8D68cD70930697E16429E47E88151.
You might also be interested in contributing to [cultdonations.org](https://cultdonations.org).