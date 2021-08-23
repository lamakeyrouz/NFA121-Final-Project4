/**
 * otpViewModel.
 *
 * Module that represents the viewModel of the OTP page
 */
var otpViewModel = (function () {
  // Private objects and functions

  // Get the url string of the page
  const queryString = window.location.search;
  // Get the params from the url
  const urlParams = new URLSearchParams(queryString);
  // Get name from url
  const name = urlParams.get("na");
  // Get email from url
  const email = urlParams.get("em");
  // Get password from url
  const password = urlParams.get("pa");

  /**
   * showLoader()
   *
   * @param {Boolean} show
   *
   * show/hide loader of page
   */
  function showLoader(show) {
    if (show) {
      document.getElementById("pageContent").style.display = "none";
      document.getElementById("loader").style.display = "block";
    } else {
      document.getElementById("loader").style.display = "none";
      document.getElementById("pageContent").style.display = "block";
    }
  }

  /**
   * bind()
   *
   * Bind observables to elements(observers)
   */
  function bind() {
    let goToHomeButton = document.getElementById("goToHome");

    // instantiate new Observer class
    const homeObserver = new Observable(); // name observable

    /**
     * submitClicked()
     *
     * observable function that will be called on notify
     */
    const submitClicked = () => {
      window.location.href = "../../homeModule/view/home.html";
    };

    // subscribe to some observers
    homeObserver.subscribe(submitClicked);

    // notify all observers about new data on event
    // Go to home button observer onclick
    goToHomeButton.addEventListener("click", () => {
      homeObserver.notify();
    });
  }

  /**
   * registerUser()
   *
   * Register the user and add him to the database
   */
  async function registerUser() {
    await register(showLoader, name, email, password);
  }

  // Return an object exposed to the public
  return {
    /**
     * onLoad()
     *
     * This function in called when the page loads
     */
    onLoad: function () {
      registerUser();
      bind();
    },
  };
})();
