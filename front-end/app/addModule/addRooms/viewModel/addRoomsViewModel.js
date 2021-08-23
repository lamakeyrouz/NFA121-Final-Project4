/**
 * addRoomsViewModel.
 *
 * Module that represents the viewModel of the Add Room page
 */
var addRoomsViewModel = (function () {
  // Private objects and functions

  // Model of the rooms page
  var roomsModel = new AddRoomsModel();

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
    let roomNameViewElement = document.getElementById("room_name");
    let campusesViewElement = document.getElementById("Campuses");
    let roomCapacityViewElement = document.getElementById("room_capacity");
    let submitRoomViewElement = document.getElementById("submitRoom");

    // instantiate new Observer class
    const nameObserver = new Observable(); // name observable
    const campusesObserver = new Observable(); // campuses observable
    const capacityObserver = new Observable(); // capacity observable
    const submitRoomObserver = new Observable(); // submit room button observable

    /**
     * updateName()
     *
     * @param {String} name
     *
     * observable function that will be called on notify
     */
    const updateName = (name) => {
      hideError();
      roomsModel.fillName(name);
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
      roomsModel.fillCampus(campus);
    };

    /**
     * updateCapacity()
     *
     * @param {String} capacity
     *
     * observable function that will be called on notify
     */
    const updateCapacity = (capacity) => {
      hideError();
      roomsModel.fillCapacity(capacity);
    };

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = checkFields;

    // subscribe to some observers
    nameObserver.subscribe(updateName);
    campusesObserver.subscribe(updateCampus);
    capacityObserver.subscribe(updateCapacity);
    submitRoomObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Name input observer
    roomNameViewElement.addEventListener("input", () => {
      nameObserver.notify(roomNameViewElement.value);
    });

    // Campus input observer
    campusesViewElement.addEventListener("change", () => {
      campusesObserver.notify(campusesViewElement.value);
    });

    // Capacity input observer
    roomCapacityViewElement.addEventListener("input", () => {
      capacityObserver.notify(roomCapacityViewElement.value);
    });

    // Submit room input observer onclick
    submitRoomViewElement.addEventListener("click", () => {
      submitRoomObserver.notify();
    });
  }

  /**
   * checkFields()
   *
   * Validate each field before submission
   */
  function checkFields() {
    let model = roomsModel.getCurrentObj();
    // Check if name is empty
    if (sharedHelpersInstance.isEmpty(model.name)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("room_name"),
        strings.roomNameEmpty
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
    // Check if capacity is empty
    if (sharedHelpersInstance.isEmpty(model.capacity)) {
      sharedHelpersInstance.showErrorInput(
        document.getElementById("room_capacity"),
        strings.roomCapacityEmpty
      );
      return;
    }

    hideError();
    // If all the fields are valid, add the room
    submitAddRoom();
  }

  /**
   * hideError()
   *
   * hides error on the input fields
   */
  function hideError() {
    sharedHelpersInstance.hideErrorInput(document.getElementById("room_name"));
    sharedHelpersInstance.hideErrorInput(document.getElementById("Campuses"));
    sharedHelpersInstance.hideErrorInput(
      document.getElementById("room_capacity")
    );
  }

  /**
   * submitAddRoom()
   *
   * Checks fields and calls api to add room
   */
  async function submitAddRoom() {
    let model = roomsModel.getCurrentObj();
    let body = {
      name: model.name,
      campus: model.campus,
      capacity: model.capacity,
    };
    await addRoom(showLoader, body);
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
      await getCampuses(showLoader, model);
      const formFactory = new FormFactory();
      document.getElementById("formFactory").innerHTML = formFactory.createForm(
        formType.addRoom
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
