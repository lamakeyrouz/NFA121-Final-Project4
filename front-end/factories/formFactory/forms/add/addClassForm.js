class AddClassForm {
  /**
   * getForm()
   *
   * Returns the HTML of the add class form
   */
  getForm() {
    var form = `
<div class="tab-pane fade in active" id="tab1default">
  <form id="login-form" class="text-left" method="post">
    <div class="main-login-form">
      <input
        class="form-control loginPage-input m-t-25"
        type="text"
        id="class_code"
        name="class_code"
        autocomplete="off"
        placeholder="Code"
        required="required"
      />
      <div style="position: relative">
        <input
          class="form-control loginPage-input m-t-25"
          type="number"
          id="class_number_of_students"
          name="class_number_of_students"
          style="padding-right: 40px"
          placeholder="Number Of Students"
          autocomplete="off"
          required="required"
        />
      </div>
      <input
        id="submitClass"
        type="button"
        class="btn btn-block login-btn signin-btn m-t-25"
        value="Add Class"
      />
    </div>
  </form>
</div>;
`;

    return form;
  }
}
