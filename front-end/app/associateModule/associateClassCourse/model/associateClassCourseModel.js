/**
 * AssociateClassCourseModel()
 *
 * Model that stores the data.
 */
class AssociateClassCourseModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { courses: [], classes: [], courseId: "", classId: "" };
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
   * fillCourse()
   *
   * @param {String} id
   *
   * Stores the id of the course
   */
  fillCourse(id) {
    this.model["courseId"] = id;
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
