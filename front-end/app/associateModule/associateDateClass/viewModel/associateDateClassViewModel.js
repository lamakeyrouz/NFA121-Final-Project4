/**
 * associateDateClassViewModel.
 *
 * Module that represents the viewModel
 */
var associateDateClassViewModel = (function () {
  // Private objects and functions

  // Model
  var associateModel = new AssociateDateClassModel();

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
    let mainViewElement = document.getElementById("mainDate");
    let startViewElement = document.getElementById("startDate");
    let endViewElement = document.getElementById("endDate");
    let submitViewElement = document.getElementById("submit");

    // instantiate new Observer class
    const classObserver = new Observable(); // class observable
    const mainObserver = new Observable(); // start observable
    const startObserver = new Observable(); // start observable
    const endObserver = new Observable(); // end observable
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
     * updateDate()
     *
     * @param {Date} date
     *
     * observable function that will be called on notify
     */
    const updateDate = (date) => {
      hideError();
      associateModel.fillMainDate(date);
    };

    /**
     * updateStart()
     *
     * @param {Time} time
     *
     * observable function that will be called on notify
     */
    const updateStart = (time) => {
      hideError();
      associateModel.fillDateStart(time);
    };

    /**
     * updateEnd()
     *
     * @param {Time} time
     *
     * observable function that will be called on notify
     */
    const updateEnd = (time) => {
      hideError();
      associateModel.fillDateFinish(time);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    classObserver.subscribe(updateClass);
    mainObserver.subscribe(updateDate);
    startObserver.subscribe(updateStart);
    endObserver.subscribe(updateEnd);
    submitObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Class input observer
    classesViewElement.addEventListener("change", () => {
      classObserver.notify(classesViewElement.selectedOptions[0].id);
    });

    //  date input observer
    mainViewElement.addEventListener("change", () => {
      mainObserver.notify(mainViewElement.value);
    });

    // Start time input observer
    startViewElement.addEventListener("change", () => {
      startObserver.notify(startViewElement.value);
    });

    // End time input observer
    endViewElement.addEventListener("change", () => {
      endObserver.notify(endViewElement.value);
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

    // Check if date is empty
    if (sharedHelpersInstance.isEmpty(model.mainDate)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("mainDate"),
        strings.selectDate
      );
      return;
    }

    // Check if startdate is empty
    if (sharedHelpersInstance.isEmpty(model.dateStart)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("startDate"),
        strings.selectStartDate
      );
      return;
    }
    // Check if endDate is empty
    if (sharedHelpersInstance.isEmpty(model.dateFinish)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("endDate"),
        strings.selectEndDate
      );
      return;
    }
    // Check if class is empty
    if (sharedHelpersInstance.isEmpty(model.classId)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("classes"),
        strings.selectClass
      );
      return;
    }

    let dateStart = sharedHelpersInstance.setDateTime(
      new Date(model.mainDate),
      model.dateStart
    );
    let dateFinish = sharedHelpersInstance.setDateTime(
      new Date(model.mainDate),
      model.dateFinish
    );

    // Check if endDate < startDate
    if (dateFinish < dateStart) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("endDate"),
        strings.endDateNotBigger
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
    sharedHelpersInstance.hideErrorInput(document.getElementById("mainDate"));
    sharedHelpersInstance.hideErrorInput(document.getElementById("startDate"));
    sharedHelpersInstance.hideErrorInput(document.getElementById("endDate"));
  }

  /**
   * submitAssociate()
   *
   * Checks fields and calls api to associate
   */
  async function submitAssociate() {
    let model = associateModel.getCurrentObj();

    let dateStart = sharedHelpersInstance.setDateTime(
      new Date(model.mainDate),
      model.dateStart
    );
    let dateFinish = sharedHelpersInstance.setDateTime(
      new Date(model.mainDate),
      model.dateFinish
    );

    var iterator = new Iterator(model.classes);
    var tempModel = {};
    iterator.each(function (item) {
      if (item._id == model.classId) {
        tempModel = {
          code: item.code,
          numberOfStudents: item.numberOfStudents,
          dateStart: dateStart,
          dateFinish: dateFinish,
        };
      }
    });
    if (tempModel.dateStart) {
      await associateClass(showLoader, tempModel, model.classId);
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
      await getClasses(showLoader, model);
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.associateDateClass
      );

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
