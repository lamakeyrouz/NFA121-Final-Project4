/**
 *
 * login()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to login the user
 */
async function login(showLoaderFunc, model) {
  var loginRequest = inherit(requestTemplate);

  loginRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  loginRequest.request = async function () {
    let pass = await sharedHelpersInstance.hashPassword(model.password);
    let body = { email: model.email, password: pass };
    let response = await request(requestType.post, enpoints.login, body);
    if (response.data) {
      let result = response.data;
      if (result.success) {
        sharedHelpersInstance.setCookie("token", result.token);
        window.location.href = "../../homeModule/view/home.html";
      } else {
        alert(result.message);
        location.reload();
      }
    } else if (response == requestResponse.success) {
      alert(strings.somethingWentWrong);
    } else {
      if (response == requestResponse.unauthorized) {
        window.location.href = "../../loginModule/view/login.html";
      } else {
        location.reload();
      }
    }
  };

  loginRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await loginRequest.call();
}
