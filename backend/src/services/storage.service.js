const ImageKit = require("imagekit");
require("dotenv").config();
var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadImage(file, filename){

    const response = await imagekit.upload({
        file: file,
        fileName: filename,
        folder: "/CationGenerator-Project-Images",
    })
    return response;
}

module.exports = uploadImage;