const express = require("express");

const campusController = require("./controllers");

const router = express.Router();

router.get("/campuses", campusController.getCampuses);

router.post("/campuses", campusController.addCampus);

module.exports = router;
