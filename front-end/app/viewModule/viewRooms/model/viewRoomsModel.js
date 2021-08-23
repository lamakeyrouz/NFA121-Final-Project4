/**
 * ViewRoomsModel()
 *
 * Model that stores the data.
 */
class ViewRoomsModel {
  /**
   * constructor()
   */
  constructor() {
    this.model = { rooms: [] };
  }

  /**
   * getCurrentObj()
   *
   * getter of our model
   */
  getCurrentObj() {
    return this.model;
  }
}
