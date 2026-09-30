/*
Limit = 3 reqs / 10s
Requests: 9.9s → 3 reqs, 10.1s → 3 reqs

[0s ---------------- 10s] [10s ---------------- 20s]
3 reqs at 9.9s ✅        1 req at 10.1s ✅


contains [9.9, 9.9, 9.9] already 
prevCount = 3 (requests in [0–10s])
currentCount = 0 (so far in [10–20s])

At 10.1s → we are 0.1s into the new window.
So 9.9s of the *old window* still overlaps with the last 10s.
effectiveCount = currentCount + (prevCount * overlap)
               = 0 + (3 * 0.99)
               = 2.97
Request #1 at 10.1s → effective = 2.97 → ✅ allowed (becomes ~3.97               
Request #2 at 10.1s → effective = ~3.97 → ❌ denied.
So you only squeeze 1 request more in that burst.
This gives almost the same accuracy as sliding log, but with constant memory (2 counters
 */

class SlidingWindowCounterLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.currentWindowStart = Date.now();
    this.currentCount = 0;
    this.prevCount = 0;
  }

  allow() {
    const now = Date.now();
    const elapsed = now - this.currentWindowStart;

    // If we've moved to a new window
    if (elapsed >= this.windowMs) {
      this.prevCount = this.currentCount;
      this.currentCount = 0;
      this.currentWindowStart = now;
    }

    // Calculate effective requests
    const fraction = (this.windowMs - elapsed) / this.windowMs;
    const effectiveCount = this.currentCount + this.prevCount * fraction;

    if (effectiveCount < this.limit) {
      this.currentCount++;
      return true;
    }

    return false;
  }
}
