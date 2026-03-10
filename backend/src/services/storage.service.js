const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadSong(file, filename) {
  const response = await imagekit.upload({
    file: file,
    fileName: filename,
    folder: "moody-player/songs",
  });
  return response;
}
async function uploadImage(file, filename) {
  const response = await imagekit.upload({
    file: file,
    fileName: filename,
    folder: "moody-player/profiles",
  });
  return response;
}

module.exports = {
  uploadSong,
  uploadImage,
};
