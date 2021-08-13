const ClassService = require("./services");

exports.getClasses = async (req, res, next) => {
  try {
    const classes = await ClassService.getClasses({});
    return res.send({ status: 200, success: true, classes: classes });
  } catch (err) {
    return res.send({ status: 400, success: false, message: err.message });
  }
};

exports.addClass = async (req, res, next) => {
  const page = req;

  try {
    await ClassService.addClass({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({success: false, message: err.message });
  }
};

exports.editClass = async (req, res, next) => {
  const page = req;
  try {
    await ClassService.editClass({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({success: false, message: err.message });
  }
};
