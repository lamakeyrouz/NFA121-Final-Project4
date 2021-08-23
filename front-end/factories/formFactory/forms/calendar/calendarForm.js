class CalendarForm {
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
        <select class="select-css" name="campuses" id="campuses">
            <option value="" disabled selected>Select a campus to generate a time-table</option>
        </select>
      </div>
    </div>
  </form>
</div>;
`;

    return form;
  }
}
