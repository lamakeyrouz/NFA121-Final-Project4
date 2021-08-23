/**
 * viewClassesViewModel.
 *
 * Module that represents the viewModel of the View Classes page
 */
var viewClassesViewModel = (function () {
  // Private objects and functions

  // Model of the classes page
  var classModel = new ViewClassesModel();

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

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: async function () {
      let model = classModel.getCurrentObj();
      await getClasses(showLoader, model);
      var iterator = new Iterator(model.classes);
      let cells = "";
      iterator.each(function (item) {
        cells =
          cells +
          `<div id="cells">Code: ${item.code}, Number Of Students: ${item.numberOfStudents}</div>`;
      });
      if (model.classes && model.classes.length > 0) {
        document.getElementById("dataArray").innerHTML = cells;
      } else {
        document.getElementById(
          "dataArray"
        ).innerHTML = `<div id="noData">No Data Found</div>`;
      }
      bind();
    },
  };
})();
