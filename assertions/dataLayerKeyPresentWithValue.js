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
 * @param {string} keyName The key to look for.
 * @param {string, boolean} keyValue The value to check for
 * @param {string} [msg] Optional log message to display in the output. If missing, one is displayed by default.
 * @api assertions
 */

exports.assertion = function(keyName, keyValue, msg) {

  const MSG_KEY_VALUE_PAIR_NOT_FOUND =
    `Testing if dataLayer contains entry: ${keyName} with value ${keyValue}, but no matching key value pairs were found.`

  const MSG_DATALAYER_UNDEFINED =
    `The dataLayer object was undefined, could not perform search for: ${keyName}`

  this.message = msg || (`Testing if dataLayer contains key: ${keyName} with value: ${keyValue}`)

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
      this.message = msg || MSG_KEY_VALUE_PAIR_NOT_FOUND
    }

    return failed
  }

  this.value = function(result) {
    return result.value
  }

  this.command = function(callback) {
    return this.api.dataLayerFindKeyWithValue(keyName, keyValue, callback)
  }
}
