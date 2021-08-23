class AssociateDateClassForm {
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
      <input
        class="form-control loginPage-input m-t-25"
        type="date"
        id="mainDate"
        name="mainDate"
        autocomplete="off"
        placeholder="Select a date for the class"
        required="required"
      />
      <input
        class="form-control loginPage-input m-t-25"
        type="time"
        id="startDate"
        name="startDate"
        autocomplete="off"
        placeholder="Select a start time for the class"
        required="required"
      />
      </div>
      <div style="position: relative">
      <input
        class="form-control loginPage-input m-t-25"
        type="time"
        id="endDate"
        name="endDate"
        autocomplete="off"
        placeholder="Select an end time for the class"
        required="required"
      />
      </div>
      <div style="position: relative">
        <select class="select-css" name="classes" id="classes">
            <option value="" disabled selected>Select a class</option>
        </select>
      </div>
      <input
        id="submit"
        type="button"
        class="btn btn-block login-btn signin-btn m-t-25"
        value="Associate Date/Class"
      />
    </div>
  </form>
</div>;
`;

    return form;
  }
}
