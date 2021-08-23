/**
 * ViewCampusesModel()
 *
 * Model that stores the data.
 */
class ViewCampusesModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { campuses: [] };
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
