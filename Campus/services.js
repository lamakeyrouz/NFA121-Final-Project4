const Campus = require("./models");

exports.getCampuses = async (query, page, limit) => {
  try {
    const campuses = await Campus.find();
    return campuses;
  } catch (err) {
    throw Error("Error while finding campuses");
  }
};

exports.addCampus = async (query, page, limit) => {
  const campus = new Campus({
    name: page.body.name,
  });
  try {
    await campus.save();
  } catch {
    throw Error("Error while adding a campus");
  }
};

// exports.editCampus = async (query, page, limit) => {
//   const campusId = page.params.campusId;
//   try {
//     await Campus.updateOne(
//       { _id: campusId },
//       {
//         $set: {
//           name: page.body.name,
//         },
//       }
//     );
//   } catch (err) {
//     throw Error("Campus could not be edited.");
//   }
// };
