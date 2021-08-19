// Model of the register page
var registerModel = new RegisterModel();
// Instance of the view model of the register page
var registerViewModel;

/**
 * onLoad()
 *
 * This function in called when the page loads to fill the forms and create an instance of our viewModel
 */
function onLoad() {
  registerViewModel = new RegisterViewModel();
  const formFactory = new FormFactory();
  document.getElementById("formFactory").innerHTML = formFactory.createForm(
    formType.signUp
  );
  registerViewModel.bind();
}

/**
 * RegisterViewModel()
 *
 * Class that represents the viewModel of the register page
 */
class RegisterViewModel {
  /**
   * constructor()
   */
  constructor() {
    // Bind the observers to functions in our model
    this.bind = function () {
      let emailViewElement = document.getElementById("reg_email");
      let passwordViewElement = document.getElementById("reg_password");
      let confirmPasswordViewElement = document.getElementById(
        "reg_confirmPassword"
      );
      let nameViewElement = document.getElementById("reg_firstname");
      let submitRegisterViewElement = document.getElementById("submitRegister");

      // Username input observer
      nameViewElement.addEventListener("input", function () {
        registerModel.fillName(nameViewElement.value);
      });

      // Email input observer
      emailViewElement.addEventListener("input", function () {
        registerModel.fillEmail(emailViewElement.value);
      });

      // Password input observer
      passwordViewElement.addEventListener("input", function () {
        registerModel.fillPassword(passwordViewElement.value);
      });

      // Confirm password input observer
      confirmPasswordViewElement.addEventListener("input", function () {
        registerModel.fillConfirmPassword(confirmPasswordViewElement.value);
      });

      // Submit register input observer onclick
      submitRegisterViewElement.addEventListener("click", this.checkFields);
    };
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  checkFields() {
    let model = registerModel.getCurrentUserObj();
    registerViewModel.submitRegister();
  }

  /**
   * submitRegister()
   *
   * Checks fields and calls api to register new user
   */
  async submitRegister() {
    console.log("HELLO");
  }
}
