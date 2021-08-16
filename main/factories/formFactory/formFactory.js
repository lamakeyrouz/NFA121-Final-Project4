//Factory method for creating new form instances
function formFactory() {
  this.createForm = function (type) {
    var form;
    switch (type) {
      case formType.login:
        form = new LoginForm();
        break;
      case formType.signUp:
        form = new Square();
        break;
      default:
        form = new Rectangle();
        break;
    }
    return shape;
  };
}
