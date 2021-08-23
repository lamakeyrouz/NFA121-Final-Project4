/**
 * AddTeachersModel()
 *
 * Model that stores the data.
 */
class AddTeachersModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { name: "" };
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
   * Stores the name of the teacher
   */
  fillName(name) {
    this.model["name"] = name;
  }
}
