import { ref } from './ref.js'
import { effect } from './effect.js'

export function computed(callback) {
  const result = ref()

  // 通过 effect 监听响应式数据的变化
  // 内部调用 callback 并将结果赋值给 result.value
  effect(() => {
    result.value = callback()
  })

  return result
}
