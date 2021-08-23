const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const classSchema = new Schema({
  code: {
    type: String,
    required: true,
  },

  numberOfStudents: {
    type: Number,
  },

  dateStart: {
    type: Date,
  },

  dateFinish: {
    type: Date,
  },
  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Class", classSchema);
