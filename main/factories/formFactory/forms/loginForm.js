class LoginForm {
  /**
   * getForm()
   *
   * Returns the HTML of the login form
   */
  getForm() {
    var form =
      '<div class="tab-pane fade in active" id="tab1default"> <form id="login-form" class="text-left" method="post" > <div class="main-login-form"> <input class="form-control loginPage-input m-t-25" type="email" id="lg_username" name="lg_username" autocomplete="off" value="" placeholder="Email" required="required" spellcheck="false" /> <div style="position: relative"> <input class="form-control loginPage-input m-t-25" type="password" id="lg_password" name="lg_password" style="padding-right: 40px" placeholder="Password" autocomplete="off" required="required" spellcheck="false" /> </div> <input id="submitLogin" type="button" class="btn btn-block login-btn signin-btn m-t-25" value="Login"/> </div> </form> </div>';
    return form;
  }
}
