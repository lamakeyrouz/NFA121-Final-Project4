const express = require("express");

const teacherController = require("./controllers");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/teachers", isAuth, teacherController.getTeachers);

router.post("/teachers", isAuth, teacherController.addTeacher);

router.put("/teachers/:teacherId", isAuth, teacherController.editTeacher);

module.exports = router;
