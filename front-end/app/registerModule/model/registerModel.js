/**
 * RegisterModel()
 *
 * Model that stores the data of the register page that includes name, email, password and, confirm password
 */
class RegisterModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { name: "", email: "", password: "", confirmPassword: "" };
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
   * fillName()
   *
   * @param {String} name
   *
   * Stores the name of the user
   */
  fillName(name) {
    this.model["name"] = name;
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

  /**
   * fillConfirmPassword()
   *
   * @param {String} password
   *
   * Stores the confirm password input of the user
   */
  fillConfirmPassword(password) {
    this.model["confirmPassword"] = password;
  }
}
