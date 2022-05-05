const isBrowser = typeof window !== "undefined"

if(isBrowser) {
  window.signal = '2041f4e9-22f8-4175-b760-483ec13b2f6c'
  window.calculatorParams = { 'org-guid': '2041f4e9-22f8-4175-b760-483ec13b2f6c' }
  window.resourceBaseUrl = 'https://embed.signalintent.com/'
}


var envId = 'env20102021'
var assetId = 'asset20102021'

function initAnalytics() {
  return !(function () {
    var analytics = (window.analytics = window.analytics || [])
    if (!analytics.initialize)
      if (analytics.invoked)
        window.console &&
          console.error &&
          console.error('Segment snippet included twice.')
      else {
        analytics.invoked = !0
        analytics.methods = [
          'trackSubmit',
          'trackClick',
          'trackLink',
          'trackForm',
          'pageview',
          'identify',
          'reset',
          'group',
          'track',
          'ready',
          'alias',
          'debug',
          'page',
          'once',
          'off',
          'on',
          'addSourceMiddleware',
          'addIntegrationMiddleware',
          'setAnonymousId',
          'addDestinationMiddleware',
        ]
        analytics.factory = function (e) {
          return function () {
            var t = Array.prototype.slice.call(arguments)
            t.unshift(e)
            analytics.push(t)
            return analytics
          }
        }
        for (var e = 0; e < analytics.methods.length; e++) {
          var key = analytics.methods[e]
          analytics[key] = analytics.factory(key)
        }
        analytics.load = function (key, e) {
          var t = document.createElement('script')
          t.type = 'text/javascript'
          t.async = !0
          t.src =
            'https://cdn.segment.com/analytics.js/v1/' +
            key +
            '/analytics.min.js'
          var n = document.getElementsByTagName('script')[0]
          n.parentNode.insertBefore(t, n)
          analytics._loadOptions = e
        }
        analytics.SNIPPET_VERSION = '4.13.1'
        analytics.load('gemUTDWF7Q6S20eqmHvRF8eQJhugm2Ux')
      }
  })()
}

var loadAppAssets = function () {
  var polyfillPromise = document.createElement('script')
  polyfillPromise.setAttribute('data-asset-id', assetId)
  polyfillPromise.src =
    'https://cdn.jsdelivr.net/npm/promise-polyfill@8/dist/polyfill.min.js'
  document.body.appendChild(polyfillPromise)

  var polifillClasslist = document.createElement('script')
  polifillClasslist.setAttribute('data-asset-id', assetId)
  polifillClasslist.src =
    'https://cdn.jsdelivr.net/npm/eligrey-classlist-js-polyfill@1.2.20171210/classList.min.js'
  document.body.appendChild(polifillClasslist)

  var polifillFindindex = document.createElement('script')
  polifillFindindex.setAttribute('data-asset-id', assetId)
  polifillFindindex.src = 'https://cdn.jsdelivr.net/npm/findindex_polyfill_mdn'
  document.body.appendChild(polifillFindindex)

  var appScript = document.createElement('script')
  appScript.setAttribute('data-asset-id', assetId)
  appScript.type = 'text/javascript'
  appScript.src = 'https://embed.signalintent.com/js/app.js'
  document.body.appendChild(appScript)

  var appVendorScript = document.createElement('script')
  appVendorScript.setAttribute('data-asset-id', assetId)
  appVendorScript.type = 'text/javascript'
  appVendorScript.src = 'https://embed.signalintent.com/js/chunk-vendors.js'
  document.body.appendChild(appVendorScript)

  var appStyles = document.createElement('link')
  appStyles.setAttribute('data-asset-id', assetId)
  appStyles.rel = 'preload'
  appStyles.href = 'https://embed.signalintent.com/css/app.css'
  appStyles.as = 'style'
  document.body.appendChild(appStyles)

  appStyles = document.createElement('link')
  appStyles.setAttribute('data-asset-id', assetId)
  appStyles.rel = 'stylesheet'
  appStyles.type = 'text/css'
  appStyles.href = 'https://embed.signalintent.com/css/app.css'
  document.body.appendChild(appStyles)
  window.isSignalScriptLoaded = true
}

function unloadEnvScript() {
  var envScript = document.querySelectorAll('[data-env-sid="' + envId + '"]')
  if (envScript) {
    envScript.forEach((script) => script.remove())
  }
}

function unloadAssets() {
  var assets = document.querySelectorAll('[data-asset-id="' + assetId + '"]')
  if (assets) {
    assets.forEach((asset) => asset.remove())
  }
}

export function unloadCalculators() {
  window.removeEventListener('DOMContentLoaded', initAnalytics)
  unloadEnvScript()
  unloadAssets()
}

export function initCalculators() {
  unloadCalculators()
  window.addEventListener('DOMContentLoaded', initAnalytics)
  var envScript = document.createElement('script')
  envScript.setAttribute('data-env-sid', envId)
  envScript.type = 'text/javascript'
  envScript.src = 'https://embed.signalintent.com/env.js'
  if (envScript.readyState) {
    envScript.onreadystatechange = function () {
      if (
        envScript.readyState === 'loaded' ||
        envScript.readyState === 'complete'
      ) {
        envScript.onreadystatechange = null
        unloadAssets()
        loadAppAssets()
      }
    }
  } else {
    envScript.onload = function () {
      unloadAssets()
      loadAppAssets()
    }
  }
  document.body.appendChild(envScript)
}

