/**
 * This custom command injects javascript onto the current window and searches the dataLayer array for a given
 * object's key name OR value (if either object name or object value matches, return true)
 *
 * @param {object} [objectName] the object to look for on the dataLayer
 * @param {function} [callback] optional callback function to execute when command finishes
 * @returns {exports} [result] the result of the command - either "true", "false", or "undefined"
 */

exports.command = function(objectName, callback) {
  const self = this
  this.execute(function(objectName) {
    const dataLayer = window['dataLayer']

    if (dataLayer) {
      for (let pass = 0; pass < dataLayer.length; pass++) {
        for (const key of Object.keys(dataLayer[pass])) {
          if (key === objectName || dataLayer[pass][key] === objectName) {
            return true
          }
        }
      }
      return false
    } else {
      return undefined
    }
  }, [objectName], function(result) {
    if (typeof callback === 'function') {
      callback.call(self, result)
    }
    return result
  })

  return this
}
