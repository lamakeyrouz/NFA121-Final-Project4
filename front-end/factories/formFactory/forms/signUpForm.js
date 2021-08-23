class SignUpForm {
  /**
   * getForm()
   *
   * Returns the HTML of the sign up form
   */
  getForm() {
    var form = `
      <div class="tab-pane fade active in" id="tab2default">
        <form id="register-form" class="text-left" method="post">
          <div class="main-login-form">
            <input
              class="form-control loginPage-input m-t-25"
              type="text"
              id="reg_firstname"
              placeholder="UserName"
              autocomplete="off"
              required="required"
              spellcheck="false"
            />
            <input
              class="form-control loginPage-input m-t-25"
              type="hidden"
              id="reg_firstname_hdn"
              name="reg_firstname"
            />
            <input
              class="form-control loginPage-input m-t-25"
              value=""
              type="text"
              id="reg_email"
              name="reg_email"
              placeholder="Email"
              autocomplete="off"
              required="required"
              spellcheck="false"
            />
            <div style="position: relative">
              <input
                class="form-control loginPage-input m-t-25"
                type="password"
                id="reg_password"
                name="reg_password"
                placeholder="Password"
                style="padding-right: 40px"
                autocomplete="off"
                required="required"
                spellcheck="false"
              />
            </div>
            <div style="position: relative">
              <input
                class="form-control loginPage-input m-t-25"
                type="password"
                id="reg_confirmPassword"
                name="reg_confirmPassword"
                placeholder="Confirm Password"
                style="padding-right: 40px"
                autocomplete="off"
                required="required"
                spellcheck="false"
              />
            </div>
            <input
              class="form-control loginPage-input m-t-25"
              type="hidden"
              id="lg_cap"
              name="lg_cap"
            />
            <input
              type="button"
              id="submitRegister"
              class="btn btn-block login-btn register-btn m-t-25"
              value="Register"
            />
          </div>
        </form>
      </div>
    `;
    return form;
  }
}
