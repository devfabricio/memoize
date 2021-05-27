export function memoize(fn) {
  const cache = new Map();
  return (...params) => {
    const key = JSON.stringify(params);

    if(cache.has(key)) {
      console.log(`Get from cache ${params}`)
      return cache.get(key)
    } else {
      const result = fn(...params)
      cache.set(key, result)
      return result
    }
  }
}

export function cache(fn) {
  // implement here
}
