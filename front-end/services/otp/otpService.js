/**
 *
 * register()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to register the user
 */
async function register(showLoaderFunc, name, email, password) {
  var registerRequest = inherit(requestTemplate);

  registerRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  registerRequest.request = async function () {
    let body = { name: name, email: email, password: password };
    let response = await request(requestType.post, enpoints.signUp, body);
    if (response.data) {
      let result = response.data;
      if (result.email && result.token && result.userId) {
        sharedHelpersInstance.setCookie("token", result.token);
        alert(strings.registerSucc);
      } else if (result.success != null && !result.success) {
        alert(result.message);
        window.location.href = "../../loginModule/view/login.html";
      }
    } else {
      window.location.href = "../../loginModule/view/login.html";
    }
  };

  registerRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await registerRequest.call();
}
