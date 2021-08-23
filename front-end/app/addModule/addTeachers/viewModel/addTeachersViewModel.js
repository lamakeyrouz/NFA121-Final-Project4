/**
 * addTeachersViewModel.
 *
 * Module that represents the viewModel of the Add Teachers page
 */
var addTeachersViewModel = (function () {
  // Private objects and functions

  // Model of the teachers page
  var teacherModel = new AddTeachersModel();

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
    let teacherNameViewElement = document.getElementById("teacher_name");
    let submitTeacherViewElement = document.getElementById("submitTeacher");

    // instantiate new Observer class
    const nameObserver = new Observable(); // name observable
    const submitTeacherObserver = new Observable(); // submit teacher button observable

    /**
     * updateName()
     *
     * @param {String} name
     *
     * observable function that will be called on notify
     */
    const updateName = (name) => {
      hideError();
      teacherModel.fillName(name);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    nameObserver.subscribe(updateName);
    submitTeacherObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Name input observer
    teacherNameViewElement.addEventListener("input", () => {
      nameObserver.notify(teacherNameViewElement.value);
    });

    // Submit teacher input observer onclick
    submitTeacherViewElement.addEventListener("click", () => {
      submitTeacherObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = teacherModel.getCurrentObj();
    // Check if name is empty
    if (sharedHelpersInstance.isEmpty(model.name)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("teacher_name"),
        strings.teacherNameNotEmpty
      );
      return;
    }

    hideError();
    // If all the fields are valid, add the teacher
    submitAddTeacher();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("teacher_name")
    );
  }

  /**
   * submitAddTeacher()
   *
   * Checks fields and calls api to add teacher
   */
  async function submitAddTeacher() {
    let model = teacherModel.getCurrentObj();
    await addTeacher(showLoader, model);
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
        formType.addTeacher
      );
      bind();
    },
  };
})();
