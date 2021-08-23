class AddCampusForm {
  /**
   * getForm()
   *
   * Returns the HTML of the add campus form
   */
  getForm() {
    var form = `
<div class="tab-pane fade in active" id="tab1default">
  <form id="login-form" class="text-left" method="post">
    <div class="main-login-form">
      <input
        class="form-control loginPage-input m-t-25"
        type="text"
        id="campus_name"
        name="campus_name"
        autocomplete="off"
        placeholder="Name"
        required="required"
      />
      <input
        id="submitCampus"
        type="button"
        class="btn btn-block login-btn signin-btn m-t-25"
        value="Add Campus"
      />
    </div>
  </form>
</div>;
`;

    return form;
  }
}
