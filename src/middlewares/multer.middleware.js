//Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files in Node.js/Express applications.


import multer from "multer";


const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // directory to save files
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname); // final filename //you can add some random things to your filename as two file names can be same.
  }
  
});


export const upload = multer({ storage });