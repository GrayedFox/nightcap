**Please note:** I no longer use Nightwatch.js for building text suites and haven't for quite some time. Will leave this here in case it is of some value to someone out there on the big bad interwebs, but I recommend [Cypress.io][0] to any clients and use it nearly exlusively for front end and API automation.

[0]: https://www.cypress.io/

# nightcap
A repository of handy custom commands, assertions, and pageObject
functions for Nightwatch.

For instructions on how to install and use Nightwatch head on over to
their [excellent website][1].

[1]: http://nightwatchjs.org/gettingstarted

### Using the globalCommands inside your Nightwatch tests

There are a few ways to achieve this but I think the cleanest is to
require the commands combined with destructuring. For example:

 ```
 //yourPageObject.js
 const { globalCommands } = require('./path/to/globals')

 module.exports = {
   commands: [globalCommands],
   elements: {
     someElement: '.someElement .selector',
     someOtherElement: '.someOtherElement .selector'
   }
 }
 ```

 Now, from inside your test file you can call any command that is
 contained inside the exported `globalCommands` object.

 ```
 //yourTestFile.js
 module.exports = {
   tags: ['homePage', 'someTag'],
   'Important elements are visible on the home page': function(client) {
     const pageObject = client.page['yourPageObject']()

     pageObject
       .navigate()

     pageObect
       .testVisibility('@someElement')
       .testVisibility('@someOtherElement')
   }
 }
 ```

