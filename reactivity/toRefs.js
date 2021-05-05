// 将代理对象转换为ref
 const toProxyRef = (proxy, key) => {
  return {
    __v_isRef: true,
    get value() {
      // proxy 是响应式对象，所以这里不需要收集依赖
      return proxy[key]
    },
    set value(newValue) {
      proxy[key] = newValue
    },
  }
}

export function toRefs(proxy) {
  const ret = {}

  for (const key in proxy) {
    ret[key] = toProxyRef(proxy, key);
  }

  return ret
}
