/**
 * ViewCalendarModel()
 *
 * Model that stores the data.
 */
class ViewCalendarModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = {
      campuses: [],
      classes: [],
      rooms: [],
      courses: [],
      teachers: [],
      campus: "",
    };
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
   * fillCampus()
   *
   * @param {String} campus
   *
   * Stores the campus of the room
   */
  fillCampus(campus) {
    this.model["campus"] = campus;
  }
}
