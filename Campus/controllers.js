const CampusService = require("./services");

exports.getCampuses = async (req, res, next) => {
  try {
    const campuses = await CampusService.getCampuses({});
    return res.send({ status: 200, success: true, campuses: campuses });
  } catch (err) {
    return res.send({ success: false, status: 400, message: err.message });
  }
};

exports.addCampus = async (req, res, next) => {
  const page = req;

  try {
    await CampusService.addCampus({}, page);
    return res.status(200).end();
  } catch (err) {
    return res.send({ success: false, message: err.message });
  }
};
