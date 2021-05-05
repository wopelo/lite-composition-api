import { reactive, effect, ref } from './reactivity/index.js'

const obj = reactive({
  name: '特朗普',
  info: {
    message: '没有人比他更懂',
  },
})

const age = ref(10)

let news = ''

effect(() => {
  news = `${age.value} 岁的 ${obj.name} 说 ${obj.info.message}`
})

setTimeout(() => {
  obj.name = '懂王'
  age.value = 80
  console.log('news', news)
}, 2000)

setTimeout(() => {
  obj.info.message = 'MAGA!!!'
  console.log('news', news)
}, 4000)

setTimeout(() => {
  console.log('name', obj.name)
  console.log('message', obj.info.message)
}, 5000)
