/**
 * Checks if a window object is present
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.windowObjectKeyPresent('optimizely', 'Custom output message');
 *    };
 * ```
 *
 * @method windowObjectKeyPresent
 * @param {string} keyName The object to look for.
 * @param {string} [message] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

exports.assertion = function(keyName, msg) {

  const MSG_OBJECT_OR_VALUE_NOT_FOUND =
    `Testing if window object contains entry: ${keyName}. Key could not be located.`

  this.message = msg || (`Testing if window object contains entry: ${keyName}`)

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
    return this.api.windowObjectFindKey(keyName, callback)
  }
}
