const multer = require("multer");
const {v4 : uuidv4} = require("uuid");

const MIME_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png" : "png",
    "image/webp" : "webp",
    "image/svg" : "svg"
};

const storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, "images");
    },
    filename : (req, file, callback) => {
        const name = uuidv4();
        const extension = MIME_TYPES[file.mimetype];
        if(extension === undefined){
            console.log("MIME TYPE non pris en charge.");
        }
        else{
            callback(null, name + "." + extension);
        }
    }
});

module.exports = multer({storage}).single("image");