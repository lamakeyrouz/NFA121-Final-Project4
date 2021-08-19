const express = require("express");

const courseController = require("./controllers");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/courses", isAuth, courseController.getCourses);

router.post("/courses", isAuth, courseController.addCourse);

router.put("/courses/:courseId", isAuth, courseController.editCourse);

module.exports = router;
