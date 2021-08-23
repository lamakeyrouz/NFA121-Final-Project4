/**
 * viewRoomsViewModel.
 *
 * Module that represents the viewModel of the View Rooms page
 */
var viewRoomsViewModel = (function () {
  // Private objects and functions

  // Model of the rooms page
  var roomsModel = new ViewRoomsModel();

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
      let model = roomsModel.getCurrentObj();
      await getRooms(showLoader, model);
      var iterator = new Iterator(model.rooms);
      let cells = "";
      iterator.each(function (item) {
        cells =
          cells +
          `<div id="cells">Name: ${item.name}, Campus: ${item.campus}, Capacity: ${item.capacity}</div>`;
      });
      if (model.rooms && model.rooms.length > 0) {
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
