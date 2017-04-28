/**
 * Checks if the given element DOES NOT contain the specified text
 *
 * ```
 *    this.demoTest = function (client) {
 *      browser.assert.notContainsText('#main', 'Night Cap')
 *    }
 * ```
 *
 * @method textAbsent
 * @param {string} [selector] selector The selector (CSS / Xpath) used to locate the element
 * @param {string} [text] text The text to look for that should not be present
 * @param {string} [msg] optional log message to display in the output. If missing, one is displayed by default
 * @api assertions
 */

exports.assertion = function(selector, text, msg) {

  const defaultMsg = `Testing if element ${selector} does not contain text: "${text}". `

  const MSG_ELEMENT_NOT_FOUND = `${defaultMsg} Element could not be located.`
  const MSG_ELEMENT_CONTAINS_TEXT = `${defaultMsg} Element contains text.`

  this.message = msg || defaultMsg

  this.expected = function() {
    return text
  }

  this.pass = function(value) {
    return value.indexOf(text) === -1
  }

  this.failure = function(result) {
    const failed = result === false || result && result.status === -1 || result === undefined
    if (result.value === undefined) {
      this.message = msg || MSG_ELEMENT_NOT_FOUND
    }

    if (result.value === false) {
      this.message = msg || MSG_ELEMENT_CONTAINS_TEXT
    }

    return failed
  }

  this.value = function(result) {
    return result.value
  }

  this.command = function(callback) {
    return this.api.getText(selector, callback)
  }

}
