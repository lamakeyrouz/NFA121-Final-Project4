var loginModel = new LoginModel();

class LoginViewModel {
  constructor() {
    this.bind = function () {
      let emailViewElement = document.getElementById("userEmail");
      let passwordViewElement = document.getElementById("userPassword");
      let submitLoginViewElement = document.getElementById("submitLogin");

      emailViewElement.addEventListener("input", function () {
        loginModel.fillEmail(emailViewElement.value);
      });

      passwordViewElement.addEventListener("input", function () {
        loginModel.fillPassword(passwordViewElement.value);
      });

      submitLoginViewElement.addEventListener("click", function () {
        this.submitLogin();
      });
    };
  }

  async submitLogin() {}
}
