const Room = require("./models");

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomsService.getRooms({});
    return res.json({ status: 200, message: "success", result: rooms });
  } catch (err) {
    return res.json({ status: 400, message: err.message });
  }
};
