/**
 * Checks if the dataLayer object contains the specified object.
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.dataLayerKeyPresent('optimizely', 'Custom output message');
 *    };
 * ```
 *
 * @method dataLayerObjectPresent
 * @param {string} keyName The object to look for.
 * @param {string} [msg] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

exports.assertion = function(keyName, msg) {

  const MSG_KEY_NOT_FOUND =
    `Testing if dataLayer contains entry: ${keyName}. Key could not be located.`

  const MSG_DATALAYER_UNDEFINED =
    `The dataLayer object was undefined, could not perform search for: ${keyName}`

  this.message = msg || (`Testing if dataLayer contains entry: ${keyName}`)

  this.expected = function() {
    return keyName
  }

  this.pass = function(value) {
    return value === true
  }

  this.failure = function(result) {
    const failed = result === false || result && result.status === -1 || result === undefined
    if (result.value === undefined) {
      this.message = msg || MSG_DATALAYER_UNDEFINED
    }

    if (result.value === false) {
      this.message = msg || MSG_KEY_NOT_FOUND
    }

    return failed
  }

  this.value = function(result) {
    return result.value
  }

  this.command = function(callback) {
    return this.api.dataLayerFindKey(keyName, callback)
  }
}
