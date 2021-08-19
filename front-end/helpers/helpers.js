/**
 * Helpers()
 *
 * Class that contains all the helper functions in the website
 */
class Helpers {
  /**
   * constructor()
   */
  constructor() {}

  /**
   *
   * hashPassword()
   *
   * @param {String} password
   *
   * Returns a hashed string of the param using sha256
   */
  async hashPassword(password) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  /**
   * isEmpty()
   *
   * @param {String} str
   *
   * Check if string is empty or null
   */
  isEmpty(str) {
    return !str || str.length === 0;
  }

  /**
   *
   * isValidMail()
   *
   * @param {String} mail
   *
   * Checks if mail is of valid format using regex.
   */
  isValidMail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
      return true;
    }
    return false;
  }

  /**
   *
   * isValidPass()
   *
   * @param {String} mail
   *
   * Checks if password is of valid.
   */
  isValidPass(pass) {
    if (pass.length < 8) {
      return false;
    }
    return true;
  }

  /**
   * showErrorInput()
   *
   * @param {HTML Element} element
   * @param {String} error
   *
   * Show an error on input
   */
  showErrorInput(element, error) {
    element.style = "border-color: red";
    if (!document.getElementById("errorInput")) {
      element.insertAdjacentHTML(
        "afterend",
        `<p style="margin: 0px; padding: 0px; color: red;" id="errorInput">${error}</p>`
      );
    }
  }

  /**
   * hideErrorInput()
   *
   * @param {HTML Element} element
   *
   * Hide an error on input
   */
  hideErrorInput(element) {
    element.style = "border-color: null;";
    let error = document.getElementById("errorInput");
    if (error) {
      error.parentNode.removeChild(error);
    }
  }
}

// Initialize the helper class
const sharedHelpersInstance = new Helpers();

// Freeze the shared instance to be used instead of created instances each time.
Object.freeze(sharedHelpersInstance);
