class AddRoomForm {
  /**
   * getForm()
   *
   * Returns the HTML of the add room form
   */
  getForm() {
    var form = `
<div class="tab-pane fade in active" id="tab1default">
  <form id="login-form" class="text-left" method="post">
    <div class="main-login-form">
      <input
        class="form-control loginPage-input m-t-25"
        type="text"
        id="room_name"
        name="room_name"
        autocomplete="off"
        placeholder="Name"
        required="required"
      />
      <div style="position: relative">
        <select class="select-css" name="Campuses" id="Campuses">
            <option value="" disabled selected>Select your campus</option>
        </select>
      </div>
      <div style="position: relative">
        <input
          class="form-control loginPage-input m-t-25"
          type="number"
          id="room_capacity"
          name="room_capacity"
          style="padding-right: 40px"
          placeholder="Capacity"
          autocomplete="off"
          required="required"
        />
      </div>
      <input
        id="submitRoom"
        type="button"
        class="btn btn-block login-btn signin-btn m-t-25"
        value="Add Room"
      />
    </div>
  </form>
</div>;
`;

    return form;
  }
}
