/**
 * associateClassCourseViewModel.
 *
 * Module that represents the viewModel
 */
var associateClassCourseViewModel = (function () {
  // Private objects and functions

  // Model
  var associateModel = new AssociateClassCourseModel();

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
    let classesViewElement = document.getElementById("classes");
    let coursesViewElement = document.getElementById("courses");
    let submitViewElement = document.getElementById("submit");

    // instantiate new Observer class
    const classObserver = new Observable(); // class observable
    const courseObserver = new Observable(); // course observable
    const submitObserver = new Observable(); // submit button observable

    /**
     * updateClass()
     *
     * @param {String} id
     *
     * observable function that will be called on notify
     */
    const updateClass = (id) => {
      hideError();
      associateModel.fillClass(id);
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
    classObserver.subscribe(updateClass);
    courseObserver.subscribe(updateCourse);
    submitObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Class input observer
    classesViewElement.addEventListener("change", () => {
      classObserver.notify(classesViewElement.selectedOptions[0].id);
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
    // Check if class is empty
    if (sharedHelpersInstance.isEmpty(model.classId)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("classes"),
        strings.selectClass
      );
      return;
    }
    // Check if course is empty
    if (sharedHelpersInstance.isEmpty(model.courseId)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("courses"),
        strings.selectCourse
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
    sharedHelpersInstance.hideErrorInput(document.getElementById("classes"));
    sharedHelpersInstance.hideErrorInput(document.getElementById("courses"));
  }

  /**
   * submitAssociate()
   *
   * Checks fields and calls api to associate
   */
  async function submitAssociate() {
    let model = associateModel.getCurrentObj();

    var iterator = new Iterator(model.courses);
    var tempModel = {};
    iterator.each(function (item) {
      if (item._id == model.courseId) {
        tempModel = {
          code: item.code,
          campus: item.campus,
          classId: model.classId,
        };
      }
    });
    if (tempModel.classId) {
      await associateCourse(showLoader, tempModel, model.courseId);
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
      await getClasses(showLoader, model);
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.associateClassCourse
      );

      // Fill courses
      var iterator = new Iterator(model.courses);
      let options = "";
      iterator.each(function (item) {
        options = options + `<option id=${item._id}>${item.code}</option>`;
      });
      document.getElementById("courses").innerHTML =
        document.getElementById("courses").innerHTML + options;

      // Fill classes
      var classIterator = new Iterator(model.classes);
      let classOptions = "";
      classIterator.each(function (item) {
        classOptions =
          classOptions + `<option id=${item._id}>${item.code}</option>`;
      });
      document.getElementById("classes").innerHTML =
        document.getElementById("classes").innerHTML + classOptions;

      bind();
    },
  };
})();
