const express = require("express");

const campusController = require("./controllers");

const router = express.Router();

const isAuth = require("../middleware/is-auth");

router.get("/campuses",isAuth, campusController.getCampuses);

router.post("/campuses",isAuth, campusController.addCampus);

module.exports = router;
