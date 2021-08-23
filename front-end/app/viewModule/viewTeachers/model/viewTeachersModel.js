/**
 * ViewTeachersModel()
 *
 * Model that stores the data.
 */
class ViewTeachersModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { teachers: [] };
  }

  /**
   * getCurrentObj()
   *
   * getter of our model
   */
  getCurrentObj() {
    return this.model;
  }
}
