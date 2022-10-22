import { ImageUploadServer } from "./mod.ts"

const port = Number(Deno.args[0])

ImageUploadServer.getInstance(port).start()