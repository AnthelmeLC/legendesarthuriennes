const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const bibliographyCtrl = require("../controllers/bibliography");

router.get("/", bibliographyCtrl.getAllBibliography);
router.post("/", auth, bibliographyCtrl.createBibliography);
router.put("/:id", auth, bibliographyCtrl.modifyBibliography);
router.delete("/:id", auth, bibliographyCtrl.deleteBibliography);

module.exports = router;