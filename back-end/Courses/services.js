const Course = require("./models");

exports.getCourses = async (query, page, limit) => {
  try {
    const courses = await Course.find();
    return courses;
  } catch (err) {
    throw Error("Error while finding courses");
  }
};

exports.addCourse = async (query, page, limit) => {
  const course = new Course({
    code: page.body.code,
    campus: page.body.campus,
    classId: page.body.classId,
  });
  try {
    await course.save();
  } catch {
    throw Error("Error while adding a course");
  }
};

exports.editCourse = async (query, page, limit) => {
  const courseId = page.params.courseId;
  try {
    await Course.updateOne(
      { _id: courseId },
      {
        $set: {
          code: page.body.code,
          campus: page.body.campus,
          classId: page.body.classId,
        },
      }
    );
  } catch (err) {
    throw Error("Course could not be edited.");
  }
};
