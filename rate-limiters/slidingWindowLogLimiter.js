/*
It solves the double burst problem because this method checks the last time of the 
request made by a user and check if that passes the window time or not
*/

function slidingWindowLimiter(options) {
  let limit = options.limit;
  let windowMs = options.windowMs;
  let now = options.now || Date.now;
  let makeKey = options.makeKey || (() => "global");

  let buckets = new Map();

  return function allow(input) {
    const key = makeKey(input);
    const currentTime = now();

    let timestamps = buckets.get(key);
    if (!timestamps) {
      timestamps = [];
      buckets.set(key, timestamps);
    }

    // 1) remove timestamps older than window
    while (timestamps.length && currentTime - timestamps[0] >= windowMs) {
      timestamps.shift();
    }

    // 2) check if under the limit
    if (timestamps.length < limit) {
      timestamps.push(currentTime);
      return true;
    }

    return false;
  };
}

const allow = slidingWindowLimiter({ limit: 3, windowMs: 10_000 });

// first 3 requests → allowed
console.log(allow("user1")); // true
console.log(allow("user1")); // true
console.log(allow("user1")); // true

// 4th request immediately → denied
console.log(allow("user1")); // false

// wait 10s, old timestamps expire → new requests allowed
setTimeout(() => {
  console.log(allow("user1")); // true
}, 10_100);
