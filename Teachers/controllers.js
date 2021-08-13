const TeacherService = require("./services");

exports.getTeachers = async (req, res, next) => {
  try {
    const teachers = await TeacherService.getTeachers({});
    return res.send({ status: 200, success: true, teachers: teachers });
  } catch (err) {
    return res.send({ status: 400, message: err.message });
  }
};

exports.addTeacher = async (req, res, next) => {
  const page = req;

  try {
    await TeacherService.addTeacher({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({ message: err.message });
  }
};

exports.editTeacher = async (req, res, next) => {
  const page = req;
  try {
    await TeacherService.editTeacher({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({ message: err.message });
  }
};
