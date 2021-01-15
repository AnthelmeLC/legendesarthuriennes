const express = require("express");
const router = express.Router();

const storyTypeCtrl = require("../controllers/storyType");

router.get("/", storyTypeCtrl.getAllStoryTypes);
router.post("/", storyTypeCtrl.createStoryType);
router.put("/:id", storyTypeCtrl.modifyStoryType);
router.delete("/:id", storyTypeCtrl.deleteStoryType);

module.exports = router;