;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-icon" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M164.380326 734.540446c-30.865985 0-58.479903 25.990954-58.479903 56.854892 0 30.861892 27.613918 58.480926 58.479903 58.480926 30.860868 0 56.854892-27.619034 56.854892-58.480926C221.234195 760.5314 195.241194 734.540446 164.380326 734.540446L164.380326 734.540446zM164.380326 455.146131c-30.865985 0-58.479903 25.987884-58.479903 56.853869 0 30.860868 27.613918 56.852846 58.479903 56.852846 30.860868 0 56.854892-25.990954 56.854892-56.852846C221.234195 481.132992 195.241194 455.146131 164.380326 455.146131L164.380326 455.146131zM372.298749 284.5835 864.492658 284.5835c29.239951 0 53.606919-22.745027 53.606919-51.979862 0-29.239951-24.366967-53.606919-53.606919-53.606919L372.298749 178.99672c-29.234835 0-53.600779 24.366967-53.600779 53.606919C318.697971 261.838474 343.063915 284.5835 372.298749 284.5835L372.298749 284.5835zM164.380326 174.122713c-30.865985 0-58.479903 27.613918-58.479903 58.479903 0 30.860868 27.613918 56.854892 58.479903 56.854892 30.860868 0 56.854892-25.993001 56.854892-56.854892C221.234195 201.737654 195.241194 174.122713 164.380326 174.122713L164.380326 174.122713zM864.492658 458.392058 372.298749 458.392058c-29.234835 0-53.600779 24.366967-53.600779 53.606919s24.365944 53.607942 53.600779 53.607942L864.492658 565.606919c29.239951 0 53.606919-24.367991 53.606919-53.607942S893.732609 458.392058 864.492658 458.392058L864.492658 458.392058zM864.492658 737.789443 372.298749 737.789443c-29.234835 0-53.600779 24.365944-53.600779 53.605895 0 29.238928 24.365944 53.605895 53.600779 53.605895L864.492658 845.001233c29.239951 0 53.606919-24.366967 53.606919-53.605895C918.098553 762.154363 893.732609 737.789443 864.492658 737.789443L864.492658 737.789443zM864.492658 737.789443"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)