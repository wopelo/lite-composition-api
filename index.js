import Vue from './src/vue.js'

import {
  reactive,
  ref,
  computed,
} from './reactivity/index.js'

const App = new Vue({
  el: '#app',
  setup() {
    const obj = reactive({
      name: '特朗普',
      info: {
        message: '没有人比他更懂',
      },
    })

    const age = ref(10)

    const news = computed(() => `${age.value} 高龄的 ${obj.name} 说 ${obj.info.message}`)

    return {
      obj,
      age,
      news,
    }
  },
  render(createElement) {
    return createElement(
      'div',
      [
        createElement('span', `${this.$data.news.value}`),
      ]
    )
  },
})

setTimeout(() => {
  App.$data.obj.name = '懂王'
  App.$data.age.value = 80
  console.log('news', App.$data.news.value)
}, 2000)

setTimeout(() => {
  App.$data.obj.info.message = 'MAGA!!!'
  console.log('news', App.$data.news.value)
}, 4000)

setTimeout(() => {
  console.log('name', App.$data.obj.name)
  console.log('message', App.$data.obj.info.message)
}, 5000)
