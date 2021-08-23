/**
 * addClassesViewModel.
 *
 * Module that represents the viewModel of the Add Classes page
 */
var addClassesViewModel = (function () {
  // Private objects and functions

  // Model of the classes page
  var classModel = new AddClassesModel();

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
    let classCodeViewElement = document.getElementById("class_code");
    let classNumberViewElement = document.getElementById(
      "class_number_of_students"
    );
    let submitClassViewElement = document.getElementById("submitClass");

    // instantiate new Observer class
    const codeObserver = new Observable(); // code observable
    const numberObserver = new Observable(); // number of students enrolled observable
    const submitClassObserver = new Observable(); // submit class button observable

    /**
     * updateCode()
     *
     * @param {String} code
     *
     * observable function that will be called on notify
     */
    const updateCode = (code) => {
      hideError();
      classModel.fillCode(code);
    };

    /**
     * updateNumber()
     *
     * @param {String} number
     *
     * observable function that will be called on notify
     */
    const updateNumber = (number) => {
      hideError();
      classModel.fillNumber(number);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    codeObserver.subscribe(updateCode);
    numberObserver.subscribe(updateNumber);
    submitClassObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Code input observer
    classCodeViewElement.addEventListener("input", () => {
      codeObserver.notify(classCodeViewElement.value);
    });

    // Capacity input observer
    classNumberViewElement.addEventListener("input", () => {
      numberObserver.notify(classNumberViewElement.value);
    });

    // Submit class input observer onclick
    submitClassViewElement.addEventListener("click", () => {
      submitClassObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = classModel.getCurrentObj();
    // Check if code is empty
    if (sharedHelpersInstance.isEmpty(model.code)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("class_code"),
        strings.codeEmpty
      );
      return;
    }

    // Check if numberOfStudents is empty
    if (sharedHelpersInstance.isEmpty(model.numberOfStudents)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("class_number_of_students"),
        strings.numberOfStudentsEmpty
      );
      return;
    }

    hideError();
    // If all the fields are valid, add the class
    submitAddClass();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(document.getElementById("class_code"));
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("class_number_of_students")
    );
  }

  /**
   * submitAddClass()
   *
   * Checks fields and calls api to add class
   */
  async function submitAddClass() {
    let model = classModel.getCurrentObj();
    await addClass(showLoader, model);
  }

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: async function () {
      showLoader(false);
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.addClass
      );
      bind();
    },
  };
})();
