const express = require("express");

const teacherController = require("./controllers");

const router = express.Router();

router.get("/teachers", teacherController.getTeachers);

router.post("/teachers", teacherController.addTeacher);

router.put("/teachers/:teacherId", teacherController.editTeacher);



module.exports = router;
