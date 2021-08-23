/**
 *
 * getCampuses()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to get all campuses
 */
async function getCampuses(showLoaderFunc, model) {
  var getCampusesRequest = inherit(requestTemplate);

  getCampusesRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  getCampusesRequest.request = async function () {
    let response = await request(requestType.get, enpoints.campuses, {});
    if (response.data) {
      let result = response.data;
      if (result.success) {
        model.campuses = response.data.campuses;
      } else {
        alert(result.message);
        window.location.href = "../../addMain/view/addMain.html";
      }
    } else {
      if (response == requestResponse.unauthorized) {
        window.location.href = "../../../loginModule/view/login.html";
      } else {
        window.location.href = "../../addMain/view/addMain.html";
      }
    }
  };

  getCampusesRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await getCampusesRequest.call();
}

/**
 *
 * addCampus()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to add a campus
 */
async function addCampus(showLoaderFunc, model) {
  var addCampusRequest = inherit(requestTemplate);

  addCampusRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  addCampusRequest.request = async function () {
    let response = await request(requestType.post, enpoints.campuses, model);
    if (response.data) {
      let result = response.data;
      if (result.success) {
        alert(strings.addCampusSuccess);
        location.reload();
      } else {
        alert(result.message);
        window.location.href = "../../addMain/view/addMain.html";
      }
    } else if (response == requestResponse.success) {
      alert(strings.addCampusSuccess);
      location.reload();
    } else if (response == requestResponse.unauthorized) {
      window.location.href = "../../../loginModule/view/login.html";
    } else {
      window.location.href = "../../addMain/view/addMain.html";
    }
  };

  addCampusRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await addCampusRequest.call();
}
