const express = require("express");

const classController = require("./controllers");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/classes", isAuth, classController.getClasses);

router.post("/classes", isAuth, classController.addClass);

router.put("/classes/:classId", isAuth, classController.editClass);

module.exports = router;
