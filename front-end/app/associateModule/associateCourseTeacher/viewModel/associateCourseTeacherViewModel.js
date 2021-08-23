/**
 * associateCourseTeacherViewModel.
 *
 * Module that represents the viewModel
 */
var associateCourseTeacherViewModel = (function () {
  // Private objects and functions

  // Model
  var associateModel = new AssociateCourseTeacherModel();

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
    let teachersViewElement = document.getElementById("teachers");
    let coursesViewElement = document.getElementById("courses");
    let submitViewElement = document.getElementById("submit");

    // instantiate new Observer class
    const teacherObserver = new Observable(); // teacher observable
    const courseObserver = new Observable(); // course observable
    const submitObserver = new Observable(); // submit button observable

    /**
     * updateTeacher()
     *
     * @param {String} id
     *
     * observable function that will be called on notify
     */
    const updateTeacher = (id) => {
      hideError();
      associateModel.fillTeacher(id);
    };

    /**
     * updateCourse()
     *
     * @param {String} id
     *
     * observable function that will be called on notify
     */
    const updateCourse = (id) => {
      hideError();
      associateModel.fillCourse(id);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    teacherObserver.subscribe(updateTeacher);
    courseObserver.subscribe(updateCourse);
    submitObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Teacher input observer
    teachersViewElement.addEventListener("change", () => {
      teacherObserver.notify(teachersViewElement.selectedOptions[0].id);
    });

    // Course input observer
    coursesViewElement.addEventListener("change", () => {
      courseObserver.notify(coursesViewElement.selectedOptions[0].id);
    });

    // Submit input observer onclick
    submitViewElement.addEventListener("click", () => {
      submitObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = associateModel.getCurrentObj();
    // Check if course is empty
    if (sharedHelpersInstance.isEmpty(model.courseId)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("courses"),
        strings.selectCourse
      );
      return;
    }
    // Check if teacher is empty
    if (sharedHelpersInstance.isEmpty(model.teacherId)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("teachers"),
        strings.selectTeacher
      );
      return;
    }

    hideError();
    // If all the fields are valid, associate
    submitAssociate();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(document.getElementById("teachers"));
    sharedHelpersInstance.hideErrorInput(document.getElementById("courses"));
  }

  /**
   * submitAssociate()
   *
   * Checks fields and calls api to associate
   */
  async function submitAssociate() {
    let model = associateModel.getCurrentObj();

    var iterator = new Iterator(model.teachers);
    var tempModel = {};
    iterator.each(function (item) {
      if (item._id == model.teacherId) {
        tempModel = {
          name: item.name,
          courseId: model.courseId,
        };
      }
    });
    if (tempModel.courseId) {
      await associateTeacher(showLoader, tempModel, model.teacherId);
    } else {
      alert(strings.somethingWentWrong);
      location.reload();
    }
  }

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: async function () {
      let model = associateModel.getCurrentObj();
      await getCourses(showLoader, model);
      await getTeachers(showLoader, model);
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.associateCourseTeacher
      );

      // Fill courses
      var iterator = new Iterator(model.courses);
      let options = "";
      iterator.each(function (item) {
        options = options + `<option id=${item._id}>${item.code}</option>`;
      });
      document.getElementById("courses").innerHTML =
        document.getElementById("courses").innerHTML + options;

      // Fill teachers
      var teacherIterator = new Iterator(model.teachers);
      let teacherOptions = "";
      teacherIterator.each(function (item) {
        teacherOptions =
          teacherOptions + `<option id=${item._id}>${item.name}</option>`;
      });
      document.getElementById("teachers").innerHTML =
        document.getElementById("teachers").innerHTML + teacherOptions;

      bind();
    },
  };
})();
