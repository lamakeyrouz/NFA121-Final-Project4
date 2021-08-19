class Helpers {
  /**
   * constructor()
   */
  constructor() {
    if (!Singleton._instance) {
      // If instance is null create an instance
      Singleton._instance = this;
    }

    // Return already created instance if it exists
    return Singleton._instance;
  }

  /**
   * getInstance()
   *
   * returns the shared instance of the class constructor to use as a singleton instance
   */
  static getInstance() {
    return this._instance;
  }

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
}
