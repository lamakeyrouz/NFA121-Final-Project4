class AddCourseForm {
  /**
   * getForm()
   *
   * Returns the HTML of the add course form
   */
  getForm() {
    var form = `
<div class="tab-pane fade in active" id="tab1default">
  <form id="login-form" class="text-left" method="post">
    <div class="main-login-form">
      <input
        class="form-control loginPage-input m-t-25"
        type="text"
        id="course_code"
        name="course_code"
        autocomplete="off"
        placeholder="Code"
        required="required"
      />
      <div style="position: relative">
        <select class="select-css" name="Campuses" id="Campuses">
            <option value="" disabled selected>Select your campus</option>
        </select>
      </div>
      <input
        id="submitCourse"
        type="button"
        class="btn btn-block login-btn signin-btn m-t-25"
        value="Add Course"
      />
    </div>
  </form>
</div>;
`;

    return form;
  }
}
