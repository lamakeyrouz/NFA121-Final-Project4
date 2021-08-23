/**
 * addCampusViewModel.
 *
 * Module that represents the viewModel of the Add Campus page
 */
var addCampusViewModel = (function () {
  // Private objects and functions

  // Model of the campus page
  var campusModel = new AddCampusModel();

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
    let campusNameViewElement = document.getElementById("campus_name");
    let submitCampusViewElement = document.getElementById("submitCampus");

    // instantiate new Observer class
    const nameObserver = new Observable(); // name observable
    const submitCampusObserver = new Observable(); // submit campus button observable

    /**
     * updateName()
     *
     * @param {String} name
     *
     * observable function that will be called on notify
     */
    const updateName = (name) => {
      hideError();
      campusModel.fillName(name);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    nameObserver.subscribe(updateName);
    submitCampusObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Name input observer
    campusNameViewElement.addEventListener("input", () => {
      nameObserver.notify(campusNameViewElement.value);
    });

    // Submit campus input observer onclick
    submitCampusViewElement.addEventListener("click", () => {
      submitCampusObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = campusModel.getCurrentObj();

    // Check if name is empty
    if (sharedHelpersInstance.isEmpty(model.name)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("campus_name"),
        strings.campusNotEmpty
      );
      return;
    }

    hideError();
    // If all the fields are valid, add the campus
    submitAddCampus();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("campus_name")
    );
  }

  /**
   * submitAddCampus()
   *
   * Checks fields and calls api to add campus
   */
  async function submitAddCampus() {
    let model = campusModel.getCurrentObj();
    await addCampus(showLoader, model);
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
        formType.addCampus
      );
      bind();
    },
  };
})();
