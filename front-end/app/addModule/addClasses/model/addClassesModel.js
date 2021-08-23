/**
 * AddClassesModel()
 *
 * Model that stores the data.
 */
class AddClassesModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { code: "", numberOfStudents: "" };
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
   * Stores the code of the class
   */
  fillCode(code) {
    this.model["code"] = code;
  }

  /**
   * fillNumber()
   *
   * @param {Number} number
   *
   * Stores the campus of the room
   */
  fillNumber(number) {
    this.model["numberOfStudents"] = number;
  }
}
