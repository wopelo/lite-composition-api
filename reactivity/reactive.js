import { track, trigger } from './effect.js'

// 判断val是否是对象
export const isObject = (val) => val !== null && typeof val === 'object'

// 递归处理
export const convert = (target) => (isObject(target) ? reactive(target) : target)
 
// 判断对象是否存在key属性
export const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key)
 
export function reactive(target) {
  // 不是对象，直接返回
  if (!isObject(target)) return target

  const handle = {
    get(target, key, receiver) {
      // 收集依赖
      track(target, key)

      console.log('get', target, key)

      // 如果key对应的值也是对象，需要再将其转换为响应式对象，用于递归收集下一级的依赖
      return convert(Reflect.get(target, key, receiver))
    },
    set(target, key, value, receiver) {
      const oldVal = Reflect.get(target, key, receiver)

      let result = true

      if (oldVal !== value) {
        console.log('set', target, key, value)

        result = Reflect.set(target, key, value, receiver)

        // 触发更新
        trigger(target, key)
      }

      return result
    },
    deleteProperty(target, key) {
      // 判断 target 中是否有自己的 key 属性
      const hadKey = hasOwn(target, key)

      // 判断是否删除成功（如果不存在 key 属性，也会返回成功）
      const result = Reflect.deleteProperty(target, key)

      if (hadKey && result) {
        console.log('delete', key)

        // 触发更新
        trigger(target, key)
      }

      return result
    },
  }

  return new Proxy(target, handle)
}
 