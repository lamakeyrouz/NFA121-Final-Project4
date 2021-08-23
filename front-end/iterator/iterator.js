/**
 * Iterator()
 *
 * Class that represents the iterator
 */
class Iterator {
  /**
   * constructor()
   *
   * @param {Array} items
   */
  constructor(items) {
    this.index = 0;
    this.items = items;
  }

  /**
   * first()
   *
   * Get first item of list
   */
  first() {
    this.reset();
    return this.next();
  }

  /**
   * next()
   *
   * Get next item of list
   */
  next() {
    return this.items[this.index++];
  }

  /**
   * hasNext()
   *
   * Returns true if item has another item after it
   */
  hasNext() {
    return this.index <= this.items.length;
  }

  /**
   * reset()
   *
   * resets the index to 0
   */
  reset() {
    this.index = 0;
  }

  /**
   * each()
   *
   * @param {completion function} callback
   *
   * Calls the funtion for each element of the array
   */
  each(callback) {
    for (var item = this.first(); this.hasNext(); item = this.next()) {
      callback(item);
    }
  }
}
