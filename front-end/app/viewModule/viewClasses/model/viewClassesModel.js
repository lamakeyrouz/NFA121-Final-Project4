/**
 * ViewClassesModel()
 *
 * Model that stores the data.
 */
class ViewClassesModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { classes: [] };
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
