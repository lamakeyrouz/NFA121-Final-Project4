const RoomsService = require("./services");

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await RoomsService.getRooms({});
    return res.send({ status: 200, success: true, rooms: rooms });
  } catch (err) {
    return res.send({ status: 400, message: err.message });
  }
};

exports.addRoom = async (req, res, next) => {
  const page = req;

  try {
    await RoomsService.addRoom({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({ message: err.message });
  }
};

exports.editRoom = async (req, res, next) => {
  const page = req;
  try {
    await RoomsService.editRoom({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({ message: err.message });
  }
};
