/**
 * viewTeachersViewModel.
 *
 * Module that represents the viewModel of the View Teachers page
 */
var viewTeachersViewModel = (function () {
  // Private objects and functions

  // Model of the teachers page
  var teacherModel = new ViewTeachersModel();

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
      let model = teacherModel.getCurrentObj();
      await getTeachers(showLoader, model);
      var iterator = new Iterator(model.teachers);
      let cells = "";
      iterator.each(function (item) {
        cells = cells + `<div id="cells">Name: ${item.name}</div>`;
      });
      if (model.teachers && model.teachers.length > 0) {
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
