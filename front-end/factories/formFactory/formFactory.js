/**
 * FormFactory()
 *
 * Creates forms to show to the user using the 'Factory' pattern
 */
function FormFactory() {
  // Create form function that returns the form based on the type passed
  this.createForm = function (type) {
    var form;
    switch (type) {
      case formType.login:
        form = new LoginForm();
        break;
      case formType.signUp:
        form = new SignUpForm();
        break;
      default:
        form = new Rectangle();
        break;
    }
    return form.getForm();
  };
}
