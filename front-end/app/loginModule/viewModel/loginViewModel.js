/**
 * loginViewModel.
 *
 * Module that represents the viewModel of the login page
 */
var loginViewModel = (function () {
  // Private objects and functions

  // Model of the login page
  var loginModel = new LoginModel();

  /**
   * showLoader()
   *
   * @param {Boolean} show
   *
   * show/hide loader of page
   */
  function showLoader(show) {
    if (show) {
      document.getElementById("pageContent").style.display = "none";
      document.getElementById("loader").style.display = "block";
    } else {
      document.getElementById("loader").style.display = "none";
      document.getElementById("pageContent").style.display = "block";
    }
  }

  // Bind observables to elements(observers)
  function bind() {
    // Get DOM Elements
    let emailViewElement = document.getElementById("lg_username");
    let passwordViewElement = document.getElementById("lg_password");
    let submitLoginViewElement = document.getElementById("submitLogin");

    // instantiate new Observer class
    const emailObserver = new Observable(); // email observable
    const passwordObserver = new Observable(); // password observable
    const submitLoginObserver = new Observable(); // submit login button observable

    /**
     * updateEmail()
     *
     * @param {String} email
     *
     * observable function that will be called on notify
     */
    const updateEmail = (email) => {
      hideError();
      loginModel.fillEmail(email);
    };

    /**
     * updatePassword()
     *
     * @param {String} pass
     *
     * observable function that will be called on notify
     */
    const updatePassword = (pass) => {
      hideError();
      loginModel.fillPassword(pass);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    emailObserver.subscribe(updateEmail);
    passwordObserver.subscribe(updatePassword);
    submitLoginObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Email input observer
    emailViewElement.addEventListener("input", () => {
      emailObserver.notify(emailViewElement.value);
    });

    // Password input observer
    passwordViewElement.addEventListener("input", () => {
      passwordObserver.notify(passwordViewElement.value);
    });

    // Submit register input observer onclick
    submitLoginViewElement.addEventListener("click", () => {
      submitLoginObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = loginModel.getCurrentUserObj();
    // Check if mail is valid
    if (!sharedHelpersInstance.isValidMail(model.email)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("lg_username"),
        strings.wrongEmail
      );
      return;
    }
    // Check if password is empty
    if (sharedHelpersInstance.isEmpty(model.password)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("lg_password"),
        strings.emptyPass
      );
      return;
    }
    // Check if password is valid
    if (!sharedHelpersInstance.isValidPass(model.password)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("lg_password"),
        strings.invalidPass
      );
      return;
    }

    hideError();
    // If all the fields are valid, login the user
    submitLogin();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("lg_username")
    );
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("lg_password")
    );
  }

  /**
   * submitLogin()
   *
   * Checks fields and calls api to login user
   */
  async function submitLogin() {
    await login(showLoader, loginModel.getCurrentUserObj());
  }

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: function () {
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.login
      );
      showLoader(false);
      bind();
    },
  };
})();
