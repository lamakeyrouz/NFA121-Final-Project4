/**
 *
 * sendMail()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to send a registration mail the user
 */
async function sendMail(showLoaderFunc, model) {
  var sendMailRequest = inherit(requestTemplate);

  sendMailRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  sendMailRequest.request = async function () {
    let pass = await sharedHelpersInstance.hashPassword(model.password);
    let body = {
      name: model.name,
      email: model.email,
      registrationLink: `${window.location.href}/../../../otpModule/view/otpView.html?na=${model.name}&em=${model.email}&pa=${pass}`,
    };
    let response = await request(requestType.post, enpoints.sendMail, body);
    if (response.data) {
      let result = response.data;
      if (result.success) {
        alert(strings.checkEmail);
      } else {
        alert(result.message);
        location.reload();
      }
    } else if (response == requestResponse.success) {
      alert(strings.checkEmail);
      location.reload();
    } else {
      if (response == requestResponse.unauthorized) {
        window.location.href = "../../loginModule/view/login.html";
      } else {
        location.reload();
      }
    }
  };

  sendMailRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await sendMailRequest.call();
}
