export default function loadScript(url) {
    const index = window.document.getElementsByTagName('script')[0]//select first element with script tag
    const script = window.document.createElement('script')//window is global object of html document
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
  }