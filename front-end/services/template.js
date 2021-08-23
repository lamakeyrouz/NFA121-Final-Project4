/**
 * requestTemplate
 *
 * Template design pattern used to define a squeleton for all api request in the website
 */
var requestTemplate = {
  call: async function () {
    this.showLoader();
    await this.request();
    this.hideLoader();
    return true;
  },
};

/**
 * inherit()
 *
 * @param {requestTemplate} proto
 *
 * Function to inherit the squeleton set by the template.
 */
function inherit(proto) {
  var F = function () {};
  F.prototype = proto;
  return new F();
}
