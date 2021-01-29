const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const storyTypeCtrl = require("../controllers/storyType");

router.get("/", auth, storyTypeCtrl.getAllStoryTypes);
router.post("/", auth, storyTypeCtrl.createStoryType);
router.put("/:id", auth, storyTypeCtrl.modifyStoryType);
router.delete("/:id", auth, storyTypeCtrl.deleteStoryType);

module.exports = router;