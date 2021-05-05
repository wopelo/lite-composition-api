import { convert, isObject } from './reactive.js'
import { track, trigger } from './effect.js'

// 将原始类型转换为响应式对象
export function ref(raw) {
  // 判断 raw 是否是 ref 创建的对象，如果是，直接返回
  if (isObject(raw) && raw.__v_isRef) return raw

  // convert 判断是否是对象，是就调用reactive，不是则直接返回
  let value = convert(raw)

  const r = {
    __v_isRef: true, // 标识，表示该对象是 ref 创建的
    get value() {
      track(r, 'value')

      return value
    },
    set value(newValue) {
      // 判断新旧值是否相等
      if (newValue !== value) {
        raw = newValue

        value = convert(raw)

        trigger(r, 'value')
      }
    },
  }

  return r
}
