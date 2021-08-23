const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },

  __v: { type: Number, select: false },
});

module.exports = mongoose.model("Teacher", teacherSchema);
