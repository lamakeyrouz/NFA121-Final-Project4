const express = require("express");

const roomController = require("./controllers");

const router = express.Router();

router.get("/rooms", roomController.getRooms);

router.post("/rooms", roomController.addRoom);

router.put("/rooms/:roomId", roomController.editRoom);



module.exports = router;
