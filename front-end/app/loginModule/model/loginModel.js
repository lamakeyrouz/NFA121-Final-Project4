/**
 * LoginModel()
 *
 * Model that stores the data of the login page that includes email and, password.
 */
class LoginModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { email: "", password: "" };
  }

  /**
   * getCurrentUserObj()
   *
   * getter of our model
   */
  getCurrentUserObj() {
    return this.model;
  }

  /**
   * fillEmail()
   *
   * @param {String} email
   *
   * Stores the email of the user
   */
  fillEmail(email) {
    this.model["email"] = email;
  }

  /**
   * fillPassword()
   *
   * @param {String} password
   *
   * Stores the password of the user
   */
  fillPassword(password) {
    this.model["password"] = password;
  }
}
