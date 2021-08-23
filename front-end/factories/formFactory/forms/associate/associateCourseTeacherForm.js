class AssociateCourseTeacherForm {
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
        <select class="select-css" name="courses" id="courses">
            <option value="" disabled selected>Select a course for the teacher</option>
        </select>
      </div>
      <div style="position: relative">
        <select class="select-css" name="teachers" id="teachers">
            <option value="" disabled selected>Select a teacher</option>
        </select>
      </div>
      <input
        id="submit"
        type="button"
        class="btn btn-block login-btn signin-btn m-t-25"
        value="Associate Course/Teacher"
      />
    </div>
  </form>
</div>;
`;

    return form;
  }
}
