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
  localiseSelectors() {
    for (const element of Object.keys(this.elements)) {
      if (pages[element]) {
        this.elements[element].selector = util.format(this.elements[element].selector, `${language}${pages[element]}`)
      }
    }
    return this
  },
  clickElement(element) {
    return this
      .waitForElementVisible(element, `Waiting for ${element} to be visible`)
      .click(element)
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
  testCookieMatch(cookie, expected) {
    this.api.getCookie(cookie, result => {
      return this.assert.equal(result.value, expected, `Testing that stored cookie: ${cookie} is equal to ${expected}`)
    })
  },
  testCookieAbsence(cookie) {
    this.api.getCookie(cookie, result => {
      return this.assert.equal(!!result, false, `Testing that there is no stored cookie: ${cookie}`)
    })
  }
}

module.exports = {
  afterEach,
  beforeEach,
  globalCommands
}
