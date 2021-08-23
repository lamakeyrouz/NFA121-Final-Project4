const Class = require("./models");

exports.getClasses = async (query, page, limit) => {
  try {
    const classes = await Class.find();
    return classes;
  } catch (err) {
    throw Error("Error while finding classes");
  }
};

exports.addClass = async (query, page, limit) => {
  const classe = new Class({
    code: page.body.code,
    numberOfStudents: page.body.numberOfStudents,
    dateStart: page.body.dateStart,
    dateFinish: page.body.dateFinish,
  });
  try {
    await classe.save();
  } catch {
    throw Error("Error while adding a class");
  }
};

exports.editClass = async (query, page, limit) => {
  const classId = page.params.classId;
  try {
    await Class.updateOne(
      { _id: classId },
      {
        $set: {
          code: page.body.code,
          numberOfStudents: page.body.numberOfStudents,
          dateStart: page.body.dateStart,
          dateFinish: page.body.dateFinish,
        },
      }
    );
  } catch (err) {
    throw Error("Class could not be edited.");
  }
};
