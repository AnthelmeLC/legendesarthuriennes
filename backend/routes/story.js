const express = require("express");
const router = express.Router();

const storyCtrl = require("../controllers/story");

router.get("/titles", storyCtrl.getAllTitles);
router.get("/:id", storyCtrl.getOneStory);
router.post("/", storyCtrl.createStory);
router.put("/:id", storyCtrl.modifyStory);
router.delete("/:id", storyCtrl.deleteStory);

module.exports = router;