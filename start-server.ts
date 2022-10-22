import { ImageUploadServer } from "./mod.ts"

const port = Number(Deno.args[0])

const targetUploadsFolder = "cult-uploads"
const imageUploadServer = await ImageUploadServer.getInstance(port, targetUploadsFolder)
imageUploadServer.start()