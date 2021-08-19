const Room = require("./models");


exports.getRooms = async (query, page, limit) => {
  try {
    const rooms = await Room.find();
    return rooms;
  } catch (err) {
    throw Error("Error while finding rooms");
  }
};

exports.addRoom = async (query, page, limit) => {
  const room = new Room({
    name: page.body.name,
    campus: page.body.campus,
    capacity: page.body.capacity,
  });
  try {
    await room.save();
  } catch {
    throw Error("Error while adding a room");
  }
  
};


exports.editRoom = async (query, page, limit) => {
  const roomId = page.params.roomId;
  try {
     await Room.updateOne(
      { _id: roomId },
      {
        $set: {
          name: page.body.name,
          campus: page.body.campus,
          capacity: page.body.capacity,
        },
      }
    );
  } catch (err) {
    throw Error("Room could not be edited.");
  }
};