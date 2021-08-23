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
    const msgBuffer = new TextEncoder().encode(password);

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
    element.style = "border-color: #219ebc";
    if (!document.getElementById("errorInput")) {
      element.insertAdjacentHTML(
        "afterend",
        `<p style="margin: 0px; padding: 0px; color: #219ebc;" id="errorInput">${error}</p>`
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

  /**
   * setCookie()
   *
   * @param {String} cname
   * @param {String} cvalue
   *
   * Sets a cookie
   */
  setCookie(cname, cvalue) {
    // var now = new Date();
    // var time = now.getTime();
    // var expireTime = time + 1000 * 7 * 36000;
    // now.setTime(expireTime);

    // let expires = "expires=" + now.toGMTString();

    // document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";

    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Since Chrome does not allow cookies for file:/// protocol i will use the localStorage instead
    window.localStorage.setItem(cname, cvalue);
  }

  /**
   * getCookie()
   *
   * @param {String} cname
   *
   * Gets the cookie from the name and returns its value
   */
  getCookie(cname) {
    // let name = cname + "=";
    // let decodedCookie = decodeURIComponent(document.cookie);
    // let ca = decodedCookie.split(";");
    // for (let i = 0; i < ca.length; i++) {
    //   let c = ca[i];
    //   while (c.charAt(0) == " ") {
    //     c = c.substring(1);
    //   }
    //   if (c.indexOf(name) == 0) {
    //     return c.substring(name.length, c.length);
    //   }
    // }
    // return "";
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // Since Chrome does not allow cookies for file:/// protocol i will use the localStorage instead
    return window.localStorage.getItem(cname);
  }

  /**
   *
   * sameDay()
   *
   * @param {Date} d1
   * @param {Date} d2
   *
   * check if two dates are in the same day
   */
  sameDay(d1, d2) {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  /**
   * setDateTime
   *
   * @param {Date} date
   * @param {Time} time
   *
   * Sets the date and time like the params
   */
  setDateTime(date, time) {
    let array = time.split(":");

    date.setHours(array[0]);
    date.setMinutes(array[1]);
    date.setSeconds("00");

    return date;
  }

  /**
   * convertUTCDateToLocalDate()
   *
   * @param {Date} date
   *
   * converts date to local time zone
   */
  convertUTCDateToLocalDate(date) {
    var newDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60 * 1000
    );

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
  }
}

// Initialize the helper class
const sharedHelpersInstance = new Helpers();

// Freeze the shared instance to be used instead of created instances each time.
Object.freeze(sharedHelpersInstance);
