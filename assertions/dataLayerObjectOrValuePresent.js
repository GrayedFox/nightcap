/**
 * Checks if the dataLayer object contains the specified object or value
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.dataLayerObjectOrValuePresent('optimizely', 'Custom output message')
 *    };
 * ```
 *
 * @method dataLayerObjectOrValuePresent
 * @param {string} [objectName] the object to look for
 * @param {string} [msg] optional log message to display in the output. If missing, one is displayed by default
 * @api assertions
 */

exports.assertion = function(objectName, msg) {

  const MSG_OBJECT_OR_VALUE_NOT_FOUND =
    `Testing if dataLayer contains object or value: ${objectName}. Object/value could not be located.`

  const MSG_DATALAYER_UNDEFINED =
    `The dataLayer object was undefined, could not perform search for: ${objectName}`

  this.message = msg || (`Testing if dataLayer contains object or value: ${objectName}`)

  this.expected = function() {
    return objectName
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
      this.message = msg || MSG_OBJECT_OR_VALUE_NOT_FOUND
    }

    return failed
  }

  this.value = function(result) {
    return result.value
  }

  this.command = function(callback) {
    return this.api.dataLayerCheck(objectName, callback)
  }
}
