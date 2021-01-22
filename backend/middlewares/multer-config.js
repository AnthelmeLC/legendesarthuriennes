const multer = require("multer");

const MIME_TYPES = {
    "image/jpg" : "jpg",
    "image/jpeg" : "jpg",
    "image/png" : "png",
    "image/webp" : "webp",
    "image/svg" : "svg"
};

const storage = multer.diskStorage({
    destination : (req, file, caalback) => {
        callback(null, "images");
    },
    filename : (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        if(extension === undefined){
            console.log("MIME TYPE non pris en charge.");
        }
        else{
            callback(null, name + Date.now() + "." + extension);
        }
    }
});

module.exports = multer({storage}).single("image");