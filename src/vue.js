import { effect } from '../reactivity/effect.js'
 
class Vue {
  constructor(options) {
    this.$options = options
    this.render = options.render
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el

    this.$data = options.setup()

    effect(() => this.$mount())
  }

  createElement(tagName, children) {
    let element = document.createElement(tagName)

    if (Object.prototype.toString.call(children) === '[object Array]') {
      children.forEach((child) => {
        element.appendChild(child)
      })
    } else {
      element.textContent = children
    }

    return element
  }

  $mount() {
    const elements = this.render(this.createElement)
    this.$el.innerHTML = ''
    this.$el.appendChild(elements)
  }
}

export default Vue
