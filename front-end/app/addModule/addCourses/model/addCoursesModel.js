/**
 * AddCoursesModel()
 *
 * Model that stores the data.
 */
class AddCoursesModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { code: "", campus: "", campuses: [] };
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
   * fillCode()
   *
   * @param {String} code
   *
   * Stores the code of the course
   */
  fillCode(code) {
    this.model["code"] = code;
  }

  /**
   * fillCampus()
   *
   * @param {String} campus
   *
   * Stores the campus of the course
   */
  fillCampus(campus) {
    this.model["campus"] = campus;
  }
}
