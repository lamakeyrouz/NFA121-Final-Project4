const CourseService = require("./services");

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await CourseService.getCourses({});
    return res.send({ status: 200, success: true, courses: courses });
  } catch (err) {
    return res.send({success: false, status: 400, message: err.message });
  }
};

exports.addCourse = async (req, res, next) => {
  const page = req;

  try {
    await CourseService.addCourse({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({success: false, message: err.message });
  }
};

exports.editCourse = async (req, res, next) => {
  const page = req;
  try {
    await CourseService.editCourse({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({success: false, message: err.message });
  }
};
