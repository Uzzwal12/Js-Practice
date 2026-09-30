// ---- Without caching ----
function fibNoCache(n) {
  if (n <= 1) return n;
  return fibNoCache(n - 1) + fibNoCache(n - 2);
}

// ---- With caching (memoization) ----
const cache = {};
function fibWithCache(n) {
  if (n in cache) return cache[n];
  if (n <= 1) return n;
  const result = fibWithCache(n - 1) + fibWithCache(n - 2);
  cache[n] = result;
  return result;
}

// ---- Measure time ----
console.time("No Cache");
console.log("Result (no cache):", fibNoCache(40));
console.timeEnd("No Cache");

console.time("With Cache");
console.log("Result (with cache):", fibWithCache(40));
console.timeEnd("With Cache");

// Run again to see benefit of cache reuse
console.time("With Cache - 2nd call");
console.log("Result (with cache, 2nd call):", fibWithCache(40));
console.timeEnd("With Cache - 2nd call");
