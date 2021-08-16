class LoginModel {
  constructor() {
    this.model = { email: "", password: "" };
  }

  getCurrentUserObj() {
    return this.model;
  }

  fillEmail(email) {
    this.model["email"] = email;
  }

  fillPassword(password) {
    this.model["password"] = password;
  }
}
