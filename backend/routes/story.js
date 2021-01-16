const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const storyCtrl = require("../controllers/story");

router.get("/titles", storyCtrl.getAllTitles);
router.get("/:id", storyCtrl.getOneStory);
router.post("/", auth, storyCtrl.createStory);
router.put("/:id", auth, storyCtrl.modifyStory);
router.delete("/:id", auth, storyCtrl.deleteStory);

module.exports = router;