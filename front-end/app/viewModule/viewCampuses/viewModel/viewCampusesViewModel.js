/**
 * viewCampusesViewModel.
 *
 * Module that represents the viewModel of the View Campuses page
 */
var viewCampusesViewModel = (function () {
  // Private objects and functions

  // Model of the campus page
  var campusModel = new ViewCampusesModel();

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
      let model = campusModel.getCurrentObj();
      await getCampuses(showLoader, model);
      var iterator = new Iterator(model.campuses);
      let cells = "";
      iterator.each(function (item) {
        cells = cells + `<div id="cells">Name: ${item.name}</div>`;
      });
      if (model.campuses && model.campuses.length > 0) {
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
