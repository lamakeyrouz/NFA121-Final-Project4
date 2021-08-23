/**
 *
 * getRooms()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to get all rooms
 */
async function getRooms(showLoaderFunc, model) {
  var getRoomsRequest = inherit(requestTemplate);

  getRoomsRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  getRoomsRequest.request = async function () {
    let response = await request(requestType.get, enpoints.viewRoom, {});
    if (response.data) {
      let result = response.data;
      if (result.success) {
        model.rooms = response.data.rooms;
      } else {
        alert(result.message);
        window.location.href = "../../viewMain/view/viewMain.html";
      }
    } else {
      if (response == requestResponse.unauthorized) {
        window.location.href = "../../../loginModule/view/login.html";
      } else {
        window.location.href = "../../viewMain/view/viewMain.html";
      }
    }
  };

  getRoomsRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await getRoomsRequest.call();
}
/**
 *
 * addRoom()
 *
 * @param {function} showLoaderFunc
 * @param {Model} model
 *
 * function to implement the template design pattern used to add a room
 */
async function addRoom(showLoaderFunc, model) {
  var addRoomRequest = inherit(requestTemplate);

  addRoomRequest.showLoader = function () {
    showLoaderFunc(true);
  };

  addRoomRequest.request = async function () {
    let body = model;
    let response = await request(requestType.post, enpoints.addRoom, body);
    if (response.data) {
      let result = response.data;
      if (result.success) {
        alert(strings.addRoomSuccess);
      } else {
        alert(result.message);
        location.reload();
      }
    } else if (response == requestResponse.success) {
      alert(strings.addRoomSuccess);
      location.reload();
    } else if (response == requestResponse.unauthorized) {
      window.location.href = "../../../loginModule/view/login.html";
    } else {
      location.reload();
    }
  };

  addRoomRequest.hideLoader = function () {
    showLoaderFunc(false);
  };

  await addRoomRequest.call();
}
