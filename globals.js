// before each test is run, maximise the client window
const beforeEach = (client, done) => {
  client.maximizeWindow(done)
}

// after each test is run, end the client session
const afterEach = (client, done) => {
  client.end(done)
}

// in order to share common functions between multiple page objects we have to wrap it in an object
const globalCommands = {
  clickElement(element) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible`)
      .click(element)
  },
  inputData(element, data) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible in order to set value: ${data}`)
      .clearValue(element)
      .setValue(element, data)
  },
  clearInput(element) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible so we can clear any input`)
      .clearValue(element)
  },
  checkVisibility(element) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible`)
  },
  testVisibility(element) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible`)
      .assert.visible(element, `Testing if ${element} is visible`)
  },
  testInvisibility(element) {
    return this
      .waitForElementNotVisible(element, `Waiting for ${element} to be invisible`)
      .assert.hidden(element, `Testing if ${element} is invisible`)
  },
  testContainsText(element, text, message) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible`)
      .assert.containsText(element, text, message)
  },
  testInputValueContainsText(element, text, message) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible`)
      .assert.valueContains(element, text, message)
  },
  testNotPresent(element) {
    return this
      .waitForElementNotPresent(element, `Waiting for ${element} to not be present`)
      .assert.elementNotPresent(element, `Testing if ${element} is not present`)
  },
  testCookieMatch(cookie, expected) {
    this.api.getCookie(cookie, result => {
      this.assert.equal(result.value, expected, `Testing that stored cookie: ${cookie} is equal to ${expected}`)
    })
    return this
  },
  testCookieAbsence(cookie) {
    this.api.getCookie(cookie, result => {
      this.assert.equal(!!result, false, `Testing that there is no stored cookie: ${cookie}`)
    })
    return this
  }
}

module.exports = {
  afterEach,
  beforeEach,
  globalCommands
}
