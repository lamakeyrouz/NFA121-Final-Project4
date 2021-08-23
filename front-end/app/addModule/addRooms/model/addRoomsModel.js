/**
 * AddRoomsModel()
 *
 * Model that stores the data.
 */
class AddRoomsModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { name: "", campus: "", capacity: "", campuses: [] };
  }

  /**
   * getCurrentObj()
   *
   * getter of our model
   */
  getCurrentObj() {
    return this.model;
  }

  /**
   * fillName()
   *
   * @param {String} name
   *
   * Stores the name of the room
   */
  fillName(name) {
    this.model["name"] = name;
  }

  /**
   * fillCampus()
   *
   * @param {String} campus
   *
   * Stores the campus of the room
   */
  fillCampus(campus) {
    this.model["campus"] = campus;
  }

  /**
   * fillCapacity()
   *
   * @param {Number} capacity
   *
   * Stores the campus of the room
   */
  fillCapacity(capacity) {
    this.model["capacity"] = capacity;
  }
}
