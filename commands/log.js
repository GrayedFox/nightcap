/**
 * This custom command allows for chainable (pretty) messages printed to the console
 *
 * @param {string} [message] the message to log
 */

exports.command = function(message) {
  return this.perform(function(client, done) {
    console.log('\x1b[34m ! \x1b[0m' + message)
    done()
  })
}
