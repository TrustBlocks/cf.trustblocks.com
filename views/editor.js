var assert = require('assert')
var footer = require('./footer')
var form = require('./form')
var header = require('./header')
var mailMenu = require('./mail-menu')
var menu = require('./menu')
var renameScreen = require('./rename-screen')
var saveScreen = require('./save-screen')
var settings = require('./settings')
var sidebar = require('./sidebar')
var signaturePages = require('./signature-pages')

module.exports = function editor (state, send) {
  assert.equal(typeof state, 'object')
  assert.equal(typeof send, 'function')
  var mode = state.mode
  var div = document.createElement('div')
  div.className = 'container'
  var article = document.createElement('article')
  article.className = 'commonform'
  div.appendChild(article)
  if (mode === 'save') {
    article.appendChild(sidebar(state.mode, send))
    article.appendChild(menu(state, send))
    article.appendChild(footer())
  } else if (mode === 'mail') {
    article.appendChild(sidebar(state.mode, send))
    article.appendChild(mailMenu(state, send))
    article.appendChild(footer())
  } else {
    article.onclick = onClick
    article.appendChild(sidebar(state.mode, send))
    if (state.mode.indexOf('preparing') === 0) {
      article.appendChild(saveScreen(state, send))
    } else if (state.mode.indexOf('renaming') === 0) {
      article.appendChild(renameScreen(state, send))
    } else {
      article.appendChild(
        header(
          state.merkle.digest,
          state.publications,
          state.annotationsList || [],
          false, [], send
        )
      )
      article.appendChild(form(state, send))
      article.appendChild(signaturePages(state.signaturePages, send))
      article.appendChild(settings(state, send))
    }
    article.appendChild(footer())
  }
  return div

  function onClick (event) {
    var target = event.target
    if (target.nodeName === 'A') {
      if (target.className === 'reference') {
        event.preventDefault()
        event.stopPropagation()
        var heading = document.getElementById(
          target.getAttribute('href').slice(1)
        )
        if (heading) {
          heading.scrollIntoView()
        }
      } else if (target.className === 'use') {
        event.preventDefault()
        event.stopPropagation()
        var definition = document.getElementById(
          target.getAttribute('href').slice(1)
        )
        if (definition) {
          definition.scrollIntoView()
        }
      }
    }
  }
}
