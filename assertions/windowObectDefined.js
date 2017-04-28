/**
 * Checks if an object is present on the window object
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.jsWindowObjectDefined('optimizely', 'Custom output message')
 *    };
 * ```
 *
 * @method windowObjectDefined
 * @param {string} [objectName] the object to look for
 * @param {string} [msg] optional log message to display in the output. If missing, one is displayed by default
 * @api assertions
 */

exports.assertion = function(objectName, msg) {

  const MSG_OBJECT_OR_VALUE_NOT_FOUND =
    `Testing global object existence: ${objectName}. Object could not be located.`

  this.message = msg || (`Testing if window object or value: ${objectName} is present`)

  this.expected = function() {
    return true
  }

  this.pass = function(value) {
    return value
  }

  this.failure = function(result) {
    const failed = result === false || result && result.status === -1 || result === undefined
    if (!result.value) {
      this.message = msg || MSG_OBJECT_OR_VALUE_NOT_FOUND
    }

    return failed
  }

  this.value = function(result) {
    return result.value
  }

  this.command = function(callback) {
    return this.api.windowObjectDefined(objectName, callback)
  }
}
