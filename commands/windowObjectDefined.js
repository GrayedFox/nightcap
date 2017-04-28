/**
 * Injects javascript onto the current page and checks that an object is defined on the window object
 *
 * @param {string} [objectName] the object to look for
 * @param {function} [callback] optional callback function to execute when command finishes
 * @returns {exports} [result] the result of the command - either "defined" or "undefined"
 */

exports.command = function(objectName, callback) {
  const self = this
  this.execute(function(value) {
    return typeof (window[value]) !== 'undefined'
  }, [objectName], function(result) {
    if (typeof callback === 'function') {
      callback.call(self, result)
    }
    return result
  })

  return this
}
