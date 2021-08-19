// Model of the login page
var loginModel = new LoginModel();
// Instance of the view model of the login page
var loginViewModel;

/**
 * onLoad()
 *
 * This function in called when the page loads to fill the forms and create an instance of our viewModel
 */
function onLoad() {
  loginViewModel = new LoginViewModel();
  const formFactory = new FormFactory();
  document.getElementById("formFactory").innerHTML = formFactory.createForm(
    formType.login
  );
  loginViewModel.bind();
}

/**
 * LoginViewModel()
 *
 * Class that represents the viewModel of the login page
 */
class LoginViewModel {
  /**
   * constructor()
   */
  constructor() {
    // Bind the observers to functions in our model
    this.bind = function () {
      let emailViewElement = document.getElementById("lg_username");
      let passwordViewElement = document.getElementById("lg_password");
      let submitLoginViewElement = document.getElementById("submitLogin");

      // Email input observer
      emailViewElement.addEventListener("input", function () {
        loginModel.fillEmail(emailViewElement.value);
      });

      // Password input observer
      passwordViewElement.addEventListener("input", function () {
        loginModel.fillPassword(passwordViewElement.value);
      });

      // Submit register input observer onclick
      submitLoginViewElement.addEventListener("click", this.checkFields);
    };
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  checkFields() {
    let model = loginModel.getCurrentUserObj();
    loginViewModel.submitLogin();
  }

  /**
   * submitRegister()
   *
   * Checks fields and calls api to register new user
   */
  async submitLogin() {
    console.log("HI");
  }
}
