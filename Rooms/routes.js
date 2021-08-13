const express = require("express");

const roomController = require("./controllers");

const router = express.Router();

const isAuth = require("../middleware/is-auth");


router.get("/rooms",isAuth, roomController.getRooms);

router.post("/rooms", isAuth,roomController.addRoom);

router.put("/rooms/:roomId", isAuth,roomController.editRoom);



module.exports = router;
