const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  campus: {
    type: String,
    required: true,
  },

  capacity: {
    type: Number,
    required: true,
  },

  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Room", roomSchema);
