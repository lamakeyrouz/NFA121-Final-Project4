/**
 * AssociateCourseTeacherModel()
 *
 * Model that stores the data.
 */
class AssociateCourseTeacherModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { courses: [], teachers: [], teacherId: "", courseId: "" };
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
   * fillTeacher()
   *
   * @param {String} id
   *
   * Stores the id of the teacher
   */
  fillTeacher(id) {
    this.model["teacherId"] = id;
  }
}
