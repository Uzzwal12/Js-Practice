/*
Now this fixed-window approach has “double burst” problem
fixed-window counters reset suddenly when the window expires.
this creates a situation where a user can “burst” twice back-to-back.

imagine this config
limit = 3 requests per 10 seconds

time:  0s      9s      10s      19s      20s
       |-------|-------|-------|-------|------->

at 9.9s (just before window end), user makes 3 requests → all allowed ✅
(because they are still within 3/10s).

at 10.1s (new window just started), user makes 3 more requests → all allowed ✅
result: user made 6 requests in ~0.2s! 😬
this is called the double burst problem.
it happens because fixed windows don’t overlap → they just reset.
sliding window (fixing double burst)
*/

// fixed-window for per userId or ip
function createPerKeyFixedWindowLimiter(options) {
  const limit = options.limit;
  const windowMs = options.windowMs;
  const now = options.now || Date.now;
  const makeKey = options.makeKey || (() => "global"); // function that turns a request into a key string

  const buckets = new Map();
  return function allow(input, cost = 1) {
    // 'input' is anything your makeKey understands (req, userId, ip, etc.)
    const key = makeKey(input); // compute the key for this action;
    const currentTime = now();

    // get current bucket for this key, or initialize a new one
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { windowStart: currentTime, count: 0 };
      buckets.set(key, bucket);
    }

    // if window expired, reset for this key
    if (currentTime - bucket.windowStart >= windowMs) {
      bucket.windowStart = currentTime;
      bucket.count = 0;
    }

    // check limit for this key
    if (bucket.count + cost <= limit) {
      bucket.count += cost;
      return true;
    }

    return false;
  };
}

const allow = createPerKeyFixedWindowLimiter({
  limit: 3,
  windowMs: 5000,
  makeKey: (req) => req.ip,
});

const reqA = { ip: "1.1.1.1" };
const reqB = { ip: "2.2.2.2" };

console.log(allow(reqA));
console.log(allow(reqA));
console.log(allow(reqB));
console.log(allow(reqA));
console.log(allow(reqA));
console.log(allow(reqB));
