/**
 * registerViewModel.
 *
 * Module that represents the viewModel of the register page
 */
var registerViewModel = (function () {
  // Private objects and functions

  // Model of the register page
  var registerModel = new RegisterModel();

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

  /**
   * bind()
   *
   * Bind observables to elements(observers)
   */
  function bind() {
    // Get DOM Elements
    let nameViewElement = document.getElementById("reg_firstname");
    let emailViewElement = document.getElementById("reg_email");
    let passwordViewElement = document.getElementById("reg_password");
    let confirmPasswordViewElement = document.getElementById(
      "reg_confirmPassword"
    );
    let submitRegisterViewElement = document.getElementById("submitRegister");

    // instantiate new Observer class
    const nameObserver = new Observable(); // name observable
    const emailObserver = new Observable(); // email observable
    const passwordObserver = new Observable(); // password observable
    const confirmPasswordObserver = new Observable(); // confirm password observable
    const submitRegisterObserver = new Observable(); // submit register button observable

    /**
     * updateName()
     *
     * @param {String} name
     *
     * observable function that will be called on notify
     */
    const updateName = (name) => {
      hideError();
      registerModel.fillName(name);
    };

    /**
     * updateEmail()
     *
     * @param {String} email
     *
     * observable function that will be called on notify
     */
    const updateEmail = (email) => {
      hideError();
      registerModel.fillEmail(email);
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
      registerModel.fillPassword(pass);
    };

    /**
     * updateConfirmPassword()
     *
     * @param {String} confPass
     *
     * observable function that will be called on notify
     */
    const updateConfirmPassword = (confPass) => {
      hideError();
      registerModel.fillConfirmPassword(confPass);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    nameObserver.subscribe(updateName);
    emailObserver.subscribe(updateEmail);
    passwordObserver.subscribe(updatePassword);
    confirmPasswordObserver.subscribe(updateConfirmPassword);
    submitRegisterObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Name input observer
    nameViewElement.addEventListener("input", () => {
      nameObserver.notify(nameViewElement.value);
    });

    // Email input observer
    emailViewElement.addEventListener("input", () => {
      emailObserver.notify(emailViewElement.value);
    });

    // Password input observer
    passwordViewElement.addEventListener("input", () => {
      passwordObserver.notify(passwordViewElement.value);
    });

    // Confirm password input observer
    confirmPasswordViewElement.addEventListener("input", () => {
      confirmPasswordObserver.notify(confirmPasswordViewElement.value);
    });

    // Submit register input observer onclick
    submitRegisterViewElement.addEventListener("click", () => {
      submitRegisterObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = registerModel.getCurrentUserObj();
    // Check if name is empty
    if (sharedHelpersInstance.isEmpty(model.name)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("reg_firstname"),
        strings.emptyName
      );
      return;
    }
    // Check if email is valid
    if (!sharedHelpersInstance.isValidMail(model.email)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("reg_email"),
        strings.wrongEmail
      );
      return;
    }
    // Check if password is empty
    if (sharedHelpersInstance.isEmpty(model.password)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("reg_password"),
        strings.emptyPass
      );
      return;
    }
    // Check if password is valid
    if (!sharedHelpersInstance.isValidPass(model.password)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("reg_password"),
        strings.invalidPass
      );
      return;
    }
    // Check if password and confirm password match
    if (model.password != model.confirmPassword) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("reg_confirmPassword"),
        strings.passDoesntMatch
      );
      return;
    }

    hideError();
    submitRegister();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("reg_firstname")
    );
    sharedHelpersInstance.hideErrorInput(document.getElementById("reg_email"));
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("reg_password")
    );
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("reg_confirmPassword")
    );
  }

  /**
   * submitRegister()
   *
   * Checks fields and calls api to send a mail to the users email to confirm registration
   */
  async function submitRegister() {
    await sendMail(showLoader, registerModel.getCurrentUserObj());
  }

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: function () {
      // fill form
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.signUp
      );
      showLoader(false);
      // add observers
      bind();
    },
  };
})();
