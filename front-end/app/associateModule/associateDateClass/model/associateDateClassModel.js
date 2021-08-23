/**
 * AssociateDateClassModel()
 *
 * Model that stores the data.
 */
class AssociateDateClassModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = {
      classes: [],
      classId: "",
      mainDate: "",
      dateStart: "",
      dateFinish: "",
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
   * fillMainDate()
   *
   * @param {String} date
   *
   * Stores the date of the class
   */
  fillMainDate(date) {
    this.model["mainDate"] = date;
  }

  /**
   * fillDateStart()
   *
   * @param {String} date
   *
   * Stores the start time of the class
   */
  fillDateStart(date) {
    this.model["dateStart"] = date;
  }

  /**
   * fillDateFinish()
   *
   * @param {String} date
   *
   * Stores the end time of the class
   */
  fillDateFinish(date) {
    this.model["dateFinish"] = date;
  }

  /**
   * fillClass()
   *
   * @param {String} id
   *
   * Stores the id of the class
   */
  fillClass(id) {
    this.model["classId"] = id;
  }
}
