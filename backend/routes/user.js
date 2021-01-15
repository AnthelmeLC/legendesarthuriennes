const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/", userCtrl.getAllUsers);
router.put("/pseudo/:id", userCtrl.modifyUserPseudo);
router.put("/password/:id", userCtrl.modifyUserPassword);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;