class AssociateClassCourseForm {
  /**
   * getForm()
   *
   * Returns the HTML
   */
  getForm() {
    var form = `
<div class="tab-pane fade in active" id="tab1default">
  <form id="login-form" class="text-left" method="post">
    <div class="main-login-form">
      <div style="position: relative">
        <select class="select-css" name="classes" id="classes">
            <option value="" disabled selected>Select a class for the course</option>
        </select>
      </div>
      <div style="position: relative">
        <select class="select-css" name="courses" id="courses">
            <option value="" disabled selected>Select a course</option>
        </select>
      </div>
      <input
        id="submit"
        type="button"
        class="btn btn-block login-btn signin-btn m-t-25"
        value="Associate Class/Course"
      />
    </div>
  </form>
</div>;
`;

    return form;
  }
}
