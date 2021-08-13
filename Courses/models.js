const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  code: {
    type: String
  },

  campus : {
    type: String,

  },

  classId : {
    type: Schema.Types.ObjectId,
    ref: 'Class'
  },

  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Course", courseSchema);
