/**
 * ViewCoursesModel()
 *
 * Model that stores the data.
 */
class ViewCoursesModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { courses: [] };
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
