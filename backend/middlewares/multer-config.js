const multer = require("multer");

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
        const prename = file.originalname.split(" ").join("_");
        const name = prename.split(".")[0];
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