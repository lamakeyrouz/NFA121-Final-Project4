/**
 *
 * getClasses()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to get all classes
 */
async function getClasses(showLoaderFunc, model) {
  var getClassesRequest = inherit(requestTemplate);

  getClassesRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  getClassesRequest.request = async function () {
    let response = await request(requestType.get, enpoints.viewClass, {});
    if (response.data) {
      let result = response.data;
      if (result.success) {
        model.classes = response.data.classes;
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

  getClassesRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await getClassesRequest.call();
}

/**
 *
 * addClass()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to add a class
 */
async function addClass(showLoaderFunc, model) {
  var addClassRequest = inherit(requestTemplate);

  addClassRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  addClassRequest.request = async function () {
    let body = model;
    let response = await request(requestType.post, enpoints.addClass, body);
    if (response.data) {
      let result = response.data;
      if (result.success) {
        alert(strings.addClassSuccess);
      } else {
        alert(result.message);
        location.reload();
      }
    } else if (response == requestResponse.success) {
      alert(strings.addClassSuccess);
      location.reload();
    } else if (response == requestResponse.unauthorized) {
      window.location.href = "../../../loginModule/view/login.html";
    } else {
      location.reload();
    }
  };

  addClassRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await addClassRequest.call();
}

/**
 *
 * associateClass()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to associate a date with a class
 */
async function associateClass(showLoaderFunc, model, classId) {
  var associateClassRequest = inherit(requestTemplate);

  associateClassRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  associateClassRequest.request = async function () {
    let body = model;
    let response = await request(
      requestType.put,
      `${enpoints.associateClass}/${classId}`,
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

  associateClassRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await associateClassRequest.call();
}
