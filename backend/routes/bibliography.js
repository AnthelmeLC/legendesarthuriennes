const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-config");

const bibliographyCtrl = require("../controllers/bibliography");

router.get("/", bibliographyCtrl.getAllBibliography);
router.post("/", auth, multer, bibliographyCtrl.createBibliography);
router.put("/:id", auth, multer, bibliographyCtrl.modifyBibliography);
router.delete("/:id", auth, bibliographyCtrl.deleteBibliography);

module.exports = router;