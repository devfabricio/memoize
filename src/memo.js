export function memoize(fn) {
  const cache = new Map();
  return (...params) => {
    let key = JSON.stringify(params);

    if(typeof params[0] === 'object') {
      key = JSON.stringify(orderObj(params[0]))
    }

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
  const cache = new Map();
  let count = 0
  return {
    fn: (...params) => {
      let key = JSON.stringify(params);

      if(cache.has(key)) {
        count += 1
        return cache.get(key)
      } else {
        const result = fn(...params)
        cache.set(key, result)
        return result
      }
    },
    hitCount: () => {
      return count
    },
    clear: () => {
      count = 0
      cache.clear()
    }
  }
}

function orderObj(obj) {
  let objKeys = Object.keys(obj).sort(function(a, b){
    if(a < b) { return -1; }
    if(a > b) { return 1; }
    return 0;
  })

  let newObj = {}

  for (const objKey of objKeys) {
    newObj[objKey] = obj[objKey]
  }

  return newObj
}
