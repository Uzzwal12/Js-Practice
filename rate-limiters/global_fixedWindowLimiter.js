function fixedWindowLimiter(options) {
  const limit = options.limit; // how many requests are allowed in each window;
  const windowMs = options.windowMs; // how long a window lasts, in milliseconds
  const now = options.now || Date.now; // a function that returns "current time" in ms (defaults to Date.now)

  // 2) Internal state for this limiter instance
  let windowStart = now(); // the timestamp (ms) when the current window started
  let count = 0; // how many actions have been allowed in the current window so far

  // Return the function you'll call for each incoming action
  return function allow(cost = 1) {
    // cost = how "expensive" this action is; default 1 (each request counts as 1)

    let currentTime = now();

    // 4) Check if the current time has moved past the window boundary
    if (currentTime - windowStart >= windowMs) {
      // if we are outside of old window, start new
      windowStart = currentTime;
      count = 0; // reset counter for new window;
    }

    // 5) Decide if we can accept this action without going over the limit
    if (count + cost <= limit) {
      count += cost;
      return true;
    }

    return false;
  };
}

const allow = fixedWindowLimiter({ limit: 3, windowMs: 5000 });

console.log(allow());
console.log(allow());
console.log(allow());
console.log(allow());

setTimeout(() => {
  console.log(allow());
}, 5001);
