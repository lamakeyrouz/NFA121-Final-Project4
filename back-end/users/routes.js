const express = require("express");

const userController = require("./controllers");

const router = express.Router();

router.post("/signup-email", userController.signupEmail);
router.post("/addUser", userController.addUser);
router.post("/login", userController.login);


module.exports = router;
