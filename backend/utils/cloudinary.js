

const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRET_KEY,
    
  });
console.log(process.env.CLOUD_NAME);
console.log(process.env.API_KEY);
console.log(process.env.SECRET_KEY);



  const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(fileToUploads, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          });
        }
      });
    });
  };
  
  const cloudinaryDeleteImg = async (fileToDelete) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(fileToDelete, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            message: 'Deleted',
          });
        }
      });
    });
  };
  

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };
