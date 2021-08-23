/**
 * addCoursesViewModel.
 *
 * Module that represents the viewModel of the Add Course page
 */
var addCoursesViewModel = (function () {
  // Private objects and functions

  // Model of the courses page
  var coursesModel = new AddCoursesModel();

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
    let courseCodeViewElement = document.getElementById("course_code");
    let campusesViewElement = document.getElementById("Campuses");
    let submitCourseViewElement = document.getElementById("submitCourse");

    // instantiate new Observer class
    const codeObserver = new Observable(); // code observable
    const campusesObserver = new Observable(); // campuses observable
    const submitCourseObserver = new Observable(); // submit course button observable

    /**
     * updateCode()
     *
     * @param {String} code
     *
     * observable function that will be called on notify
     */
    const updateCode = (code) => {
      hideError();
      coursesModel.fillCode(code);
    };

    /**
     * updateCampus()
     *
     * @param {String} campus
     *
     * observable function that will be called on notify
     */
    const updateCampus = (campus) => {
      hideError();
      coursesModel.fillCampus(campus);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    codeObserver.subscribe(updateCode);
    campusesObserver.subscribe(updateCampus);
    submitCourseObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Code input observer
    courseCodeViewElement.addEventListener("input", () => {
      codeObserver.notify(courseCodeViewElement.value);
    });

    // Campus input observer
    campusesViewElement.addEventListener("change", () => {
      campusesObserver.notify(campusesViewElement.value);
    });

    // Submit course input observer onclick
    submitCourseViewElement.addEventListener("click", () => {
      submitCourseObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = coursesModel.getCurrentObj();
    // Check if code is empty
    if (sharedHelpersInstance.isEmpty(model.code)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("course_code"),
        strings.codeEmpty
      );
      return;
    }
    // Check if campus is empty
    if (sharedHelpersInstance.isEmpty(model.campus)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("Campuses"),
        strings.campusNotSelected
      );
      return;
    }

    hideError();
    // If all the fields are valid, add the course
    submitAddCourse();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("course_code")
    );
    sharedHelpersInstance.hideErrorInput(document.getElementById("Campuses"));
  }

  /**
   * submitAddCourse()
   *
   * Checks fields and calls api to add course
   */
  async function submitAddCourse() {
    let model = coursesModel.getCurrentObj();
    let body = {
      code: model.code,
      campus: model.campus,
    };
    await addCourse(showLoader, body);
  }

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: async function () {
      let model = coursesModel.getCurrentObj();
      await getCampuses(showLoader, model);
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.addCourse
      );
      var iterator = new Iterator(model.campuses);
      let options = "";
      iterator.each(function (item) {
        options = options + `<option>${item.name}</option>`;
      });
      document.getElementById("Campuses").innerHTML =
        document.getElementById("Campuses").innerHTML + options;
      bind();
    },
  };
})();
