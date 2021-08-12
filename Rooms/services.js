const Room = require("../albums/models");

exports.getRooms = async (query, page, limit) => {
    try {
      const rooms = await Room.find();
      return rooms;
    } catch (err) {
      throw Error("Error while finding tracks");
    }
  };