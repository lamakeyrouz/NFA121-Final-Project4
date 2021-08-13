const express = require("express");

const courseController = require("./controllers");

const router = express.Router();

router.get("/courses", courseController.getCourses);

router.post("/courses", courseController.addCourse);

router.put("/courses/:courseId", courseController.editCourse);



module.exports = router;
