var assert = require('assert')
var comparison = require('./comparison')
var footer = require('./footer')
var h = require('hyperscript')
var header = require('./header')
var loading = require('./loading')
var sidebar = require('./sidebar')

module.exports = function compare (a, b, state, send) {
  assert(typeof a === 'string')
  assert(typeof b === 'string')
  assert(typeof state === 'object')
  assert(typeof send === 'function')
  var haveData = state.merkle && state.diff
  if (!haveData) {
    return loading(state.mode, function () {
      send('form:compare', [a, b])
    })
  } else {
    return h('div.container',
      h('article.commonform',
        sidebar(state.mode, send),
        header(
          state.merkle.digest,
          state.publications,
          [],
          state.comparing.merkle.digest,
          state.comparing.publications,
          send
        ),
        comparison(state.diff, send),
        footer()
      )
    )
  }
}
