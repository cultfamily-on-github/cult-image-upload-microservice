import { express, formidableMiddleware } from "./deps.ts"
import { exists } from "https://deno.land/std/fs/mod.ts"
export class ImageUploadServer {

	private static instance: ImageUploadServer
	private static uploadsFolder: string

	public static async getInstance(port: number, targetFolderRelativeToCurrentFolder: string = "./", activateMiddlewareForSpecificRoutesOptions: any[] = []) {
		if (ImageUploadServer.instance === undefined) {
			if (port > 0) {
				ImageUploadServer.instance = new ImageUploadServer(port, activateMiddlewareForSpecificRoutesOptions)
			 	ImageUploadServer.uploadsFolder = `${Deno.cwd()}/${targetFolderRelativeToCurrentFolder}`
				if (await exists(ImageUploadServer.uploadsFolder)) {
					console.log(`perfect - the target upload folder is ready to receive fancy images ${ImageUploadServer.uploadsFolder}.`)
				} else {
					console.log(`I create the target upload folder ${ImageUploadServer.uploadsFolder}.`)
					await Deno.mkdir(ImageUploadServer.uploadsFolder);
				}

				
			} else {
				console.log("please specify a port by giving a parameter like 3000")
			}
		}
		return ImageUploadServer.instance
	}

	private started = false
	private app = express();
	private port;
	private activateMiddlewareForSpecificRoutesOptions: any[] = []


	private constructor(port: number, activateMiddlewareForSpecificRoutesOptions: any[]) { // constructor is private to adhere to singleton pattern
		this.port = port
		if (activateMiddlewareForSpecificRoutesOptions.length > 0) { // advanced mode 
			console.log("configuring middleware usage")
			this.activateMiddlewareForSpecificRoutesOptions = activateMiddlewareForSpecificRoutesOptions
			for (const activateMiddlewareForSpecificRoutesOption of this.activateMiddlewareForSpecificRoutesOptions) {
				this.app.use(activateMiddlewareForSpecificRoutesOption.route, activateMiddlewareForSpecificRoutesOption.middlewareFunction)
			}
		}
	}

	public async start(): Promise<void> {
		if (this.started) {
			throw new Error(`The ImageUploadServer has already been started`)
		}
		this.started = true

		console.log(`uploads folder: ${ImageUploadServer.uploadsFolder}`)
		this.app.use(express.static('./cult-uploads'))
		this.app.use("/api/v1/uploadImage", formidableMiddleware({
			uploadDir: ImageUploadServer.uploadsFolder,
			multiples: false,
			maxFileSize: 20 * 1024 * 1024, // 20 MB
			filter: function ({ name, originalFilename, mimetype }) {
				// keep only images
				return mimetype && mimetype.includes("image");
			}
		}));

		this.app.get("/", (req, res) => {
			res.send(`
				<form id="yourFormId" enctype="multipart/form-data" action="/api/v1/uploadImage" method="post">
				  <input type="file" name="file1" multiple><br>
				  <input type="submit" value="Submit">
				</form>
		`);
		});

		// http://localhost:8048/api/v1/getImage?name=image-2022-10-22T12:10:36.216Z
		this.app.get("/api/v1/getImage", (req, res) => {
			console.log(`sending image ${req.query.name}`)
			const htmlToBeSent = `<img src="http://localhost:8048/api/v1/getFile?name=${req.query.name}" />`
			console.log(htmlToBeSent)
			res.send(htmlToBeSent);
			// res.send(`<img src="https://www.w3schools.com/images/w3schools_green.jpg" />`);
		});

		// http://localhost:8048/api/v1/getFile?name=image-2022-10-22T12:10:36.216Z
		this.app.get("/api/v1/getFile", (req, res) => {
			console.log(`sending image ${req.query.name}`)
			// res.set({'Content-Type': 'image/png'});
			res.sendFile(`${ImageUploadServer.uploadsFolder}/${req.query.name}`);
		});

		this.app.post('/api/v1/uploadImage', async function (req, res) {
			try {
				const newPath = `${ImageUploadServer.uploadsFolder}/image-${new Date().toISOString()}`
				Deno.rename(req.files.file1.path, newPath)
				res.send("upload successful")
			} catch(error){
				console.log(`error during upload ${error.message}`)
			}
		})



		if (this.port.toString().indexOf(443) === -1) {

			this.app.listen(this.port, () => console.log(`server has started on http://localhost:${this.port} 🚀`));

		} else {

			const domainName = "cultdonations.org" // as an individual example
			const pathToCerts = `/etc/letsencrypt/live/${domainName}`
			const pathToCertFile = `${pathToCerts}/fullchain.pem`
			const pathToKeyFile = `${pathToCerts}/privkey.pem`

			console.log(`reading cert file from ${pathToCertFile}`);
			console.log(`reading key file from ${pathToKeyFile}`);

			const cert = await Deno.readTextFile(pathToCertFile);
			const key = await Deno.readTextFile(pathToKeyFile);

			console.log(cert.length);
			console.log(key.length);

			const options = {
				port: this.port,
				certFile: pathToCertFile,
				keyFile: pathToKeyFile
			};

			try {
				await this.app.listen(options);
				console.log(`server has started on https://localhost:${this.port} 🚀`);
			} catch (error) {
				console.log(`shit happened: ${error}`);
			}
		}
	}

}

