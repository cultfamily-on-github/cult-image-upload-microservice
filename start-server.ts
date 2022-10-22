import { ImageUploadServer } from "./mod.ts"

const port = Number(Deno.args[0])

const targetUploadsFolder = "./cult-uploads"
ImageUploadServer.getInstance(port, targetUploadsFolder).start()