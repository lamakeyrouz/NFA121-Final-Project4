const Teacher = require("./models");

exports.getTeachers = async (query, page, limit) => {
  try {
    const teachers = await Teacher.find();
    return teachers;
  } catch (err) {
    throw Error("Error while finding teachers");
  }
};

exports.addTeacher = async (query, page, limit) => {
  const teacher = new Teacher({
    name: page.body.name,
    courseId: page.body.courseId,
  });
  try {
    await teacher.save();
  } catch {
    throw Error("Error while adding a teacher");
  }
};

exports.editTeacher = async (query, page, limit) => {
  const teacherId = page.params.teacherId;
  try {
    await Teacher.updateOne(
      { _id: teacherId },
      {
        $set: {
          name: page.body.name,
          courseId: page.body.courseId,
        },
      }
    );
  } catch (err) {
    throw Error("Teacher could not be edited.");
  }
};
