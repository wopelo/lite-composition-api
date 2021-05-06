import {
  reactive,
  effect,
  ref,
  toRefs,
  computed,
} from './reactivity/index.js'

const obj = reactive({
  name: '特朗普',
  info: {
    message: '没有人比他更懂',
  },
})

const age = ref(10)

const data = toRefs(obj)

let news = ''

const fakeNews = computed(() => `${age.value} 高龄的 ${obj.name} 没有说过 ${obj.info.message}`)

effect(() => {
  news = `${age.value} 高龄的 ${obj.name} 说 ${obj.info.message}`
})

setTimeout(() => {
  obj.name = '懂王'
  age.value = 80
  console.log('news', news)
  console.log('fake news', fakeNews.value)
}, 2000)

setTimeout(() => {
  obj.info.message = 'MAGA!!!'
  console.log('news', news)
  console.log('fake news', fakeNews.value)
}, 4000)

setTimeout(() => {
  console.log('name', obj.name)
  console.log('message', obj.info.message)
  console.log('data', { ...data }, data.name.value)
}, 5000)