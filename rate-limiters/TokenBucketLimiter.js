class TokenBucketLimiter {
  constructor(capacity, refillPerSecond) {
    if (capacity <= 0) throw new Error("capacity must be > 0");
    if (refillPerSecond <= 0) throw new Error("refillPerSecond must be > 0");

    this.capacity = capacity; // max tokens bucket can hold
    this.refillPerSecond = refillPerSecond; // how many tokens are added per second
    this.tokens = capacity; // start with full bucket
    this.lastRefill = Date.now(); // track when we last refilled
  }

  allow(cost = 1) {
    if (cost <= 0) return true;
    let now = Date.now();
    let deltaSeconds = (now - this.lastRefill) / 1000;

    const refilled = deltaSeconds * this.refillPerSecond;
    this.tokens = Math.min(this.capacity, refilled + this.tokens);
    this.lastRefill = now;

    if (this.tokens >= cost) {
      this.tokens -= cost;
      return true;
    } else {
      return false;
    }
  }
}

const limiter = new TokenBucketLimiter(5, 1); // 5 burst, 1 token per second

setInterval(() => {
  const allowed = limiter.allow();
  console.log("Request:", allowed ? "✅ Allowed" : "❌ Denied");
}, 300); // request every 300ms
