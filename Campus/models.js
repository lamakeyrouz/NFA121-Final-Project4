const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const campusSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Campus", campusSchema);
