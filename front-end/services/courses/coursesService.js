/**
 *
 * getCourses()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to get all courses
 */
async function getCourses(showLoaderFunc, model) {
  var getCoursesRequest = inherit(requestTemplate);

  getCoursesRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  getCoursesRequest.request = async function () {
    let response = await request(requestType.get, enpoints.viewCourse, {});
    if (response.data) {
      let result = response.data;
      if (result.success) {
        model.courses = response.data.courses;
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

  getCoursesRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await getCoursesRequest.call();
}

/**
 *
 * addCourse()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to add a course
 */
async function addCourse(showLoaderFunc, model) {
  var addCourseRequest = inherit(requestTemplate);

  addCourseRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  addCourseRequest.request = async function () {
    let body = model;
    let response = await request(requestType.post, enpoints.addCourse, body);
    if (response.data) {
      let result = response.data;
      if (result.success) {
        alert(strings.addCourseSuccess);
      } else {
        alert(result.message);
        location.reload();
      }
    } else if (response == requestResponse.success) {
      alert(strings.addCourseSuccess);
      location.reload();
    } else if (response == requestResponse.unauthorized) {
      window.location.href = "../../../loginModule/view/login.html";
    } else {
      location.reload();
    }
  };

  addCourseRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await addCourseRequest.call();
}

/**
 *
 * associateCourse()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to associate a class with a course
 */
async function associateCourse(showLoaderFunc, model, courseId) {
  var associateCourseRequest = inherit(requestTemplate);

  associateCourseRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  associateCourseRequest.request = async function () {
    let body = model;
    let response = await request(
      requestType.put,
      `${enpoints.associateCourse}/${courseId}`,
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

  associateCourseRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await associateCourseRequest.call();
}
