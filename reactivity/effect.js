// 当前活动的 effect 函数
let activeEffect = null

export function effect(callback) {
  activeEffect = callback

  // 执行回调函数，会触发所使用数据的get函数
  // get函数中又执行了track函数
  callback()

  // 重置
  activeEffect = null
}

// 依赖列表，key是对象，value是map
// value的key的属性，value是set，里面是各个地方收集到的回调
let targetMap = new WeakMap()

// 收集依赖
export function track(target, key) {
  if (!activeEffect) return

  let depsMap = targetMap.get(target)

  // 如果没有，创建 depsMap 并添加到字典中
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)

  // 如果没有，创建 dep 并添加到字典中
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  // 添加 effect 回调函数
  dep.add(activeEffect)

  console.log('targetMap', targetMap)
}

// 触发更新
export function trigger(target, key) {
  const depsMap = targetMap.get(target)

  if (!depsMap) return

  const dep = depsMap.get(key)

  if (!dep) return

  // 遍历 dep 集合，执行 effect 回调函数
  dep.forEach((callback) => {
    callback()
  })
}
