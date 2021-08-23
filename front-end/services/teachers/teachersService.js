/**
 *
 * getTeachers()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to get all teachers
 */
async function getTeachers(showLoaderFunc, model) {
  var getTeachersRequest = inherit(requestTemplate);

  getTeachersRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  getTeachersRequest.request = async function () {
    let response = await request(requestType.get, enpoints.viewTeacher, {});
    if (response.data) {
      let result = response.data;
      if (result.success) {
        model.teachers = response.data.teachers;
      } else {
        alert(result.message);
        window.location.href = "../../viewMain/view/viewMain.html";
      }
    } else {
      if (response == requestResponse.unauthorized) {
        window.location.href = "../../../loginModule/view/login.html";
      } else {
        window.location.href = "../../viewMain/view/viewMain.html";
      }
    }
  };

  getTeachersRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await getTeachersRequest.call();
}

/**
 *
 * addTeacher()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to add a teacher
 */
async function addTeacher(showLoaderFunc, model) {
  var addTeacherRequest = inherit(requestTemplate);

  addTeacherRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  addTeacherRequest.request = async function () {
    let body = model;
    let response = await request(requestType.post, enpoints.addTeacher, body);
    if (response.data) {
      let result = response.data;
      if (result.success) {
        alert(strings.addTeacherSuccess);
      } else {
        alert(result.message);
        location.reload();
      }
    } else if (response == requestResponse.success) {
      alert(strings.addTeacherSuccess);
      location.reload();
    } else if (response == requestResponse.unauthorized) {
      window.location.href = "../../../loginModule/view/login.html";
    } else {
      location.reload();
    }
  };

  addTeacherRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await addTeacherRequest.call();
}

/**
 *
 * associateTeacher()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to associate a course with a teacher
 */
async function associateTeacher(showLoaderFunc, model, teacherId) {
  var associateTeacherRequest = inherit(requestTemplate);

  associateTeacherRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  associateTeacherRequest.request = async function () {
    let body = model;
    let response = await request(
      requestType.put,
      `${enpoints.associateTeacher}/${teacherId}`,
      body
    );
    if (response.data) {
      let result = response.data;
      if (result.success) {
        alert(strings.associatedSuccessfully);
      } else {
        alert(result.message);
        location.reload();
      }
    } else if (response == requestResponse.success) {
      alert(strings.associatedSuccessfully);
      location.reload();
    } else if (response == requestResponse.unauthorized) {
      window.location.href = "../../../loginModule/view/login.html";
    } else {
      location.reload();
    }
  };

  associateTeacherRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await associateTeacherRequest.call();
}
