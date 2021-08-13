const express = require("express");

const classController = require("./controllers");

const router = express.Router();

router.get("/classes", classController.getClasses);

router.post("/classes", classController.addClass);

router.put("/classes/:classId", classController.editClass);



module.exports = router;
