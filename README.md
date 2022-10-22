# Image Upload Server
After having spent many hours looking for a simple and actually working image upload solution for Deno, I decided to program and publish this module. 

This [Deno Module](https://deno.land/x/cult_image_upload_server) supports the [cultmagazine.org](https://cultmagazine.org).  


## Usage
At the moment it is still necessary to git clone this repo because https://deno.com/blog/v1.25#experimental-npm-support is still experimental (I use e.g. npm:express and npm:formidable which are considered "local modules"). Let's wait for some more magic by Ryan Dahl and Friends before improving the programmer experience even further. 
```sh

git clone https://github.com/cultfamily-on-github/cult-image-upload-microservice.git
cd cult-image-upload-microservice

```

### Basic

```sh

deno run --allow-net --allow-read --allow-write --unstable --allow-env start-server.ts 8048

# visit http://localhost:8048 and do the obvious :) enjoy be happy and support the CULT

```


### Advanced 
If you want to use e.g. an authentication middleware for specific routes you can check and execute ... start-server-with-authentication-middleware.ts
```sh

deno run --allow-net --allow-read --allow-write --unstable --allow-env start-server-with-authentication-middleware.ts 8048

# visit http://localhost:8048 and do the obvious :) enjoy be happy and support the CULT

```


## Donations
If you like my work, please consider donating some Ether, CULT or RVLT to 0x9E972a43B3B8D68cD70930697E16429E47E88151.
You might also be interested in contributing to [cultdonations.org](https://cultdonations.org).