const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const userCtrl = require("../controllers/user");

router.post("/signup", auth, userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", auth, userCtrl.getAllUsers);
router.put("/pseudo/:id", auth, userCtrl.modifyUserPseudo);
router.put("/password/:id", auth, userCtrl.modifyUserPassword);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;