class LeakyBucketLimiter {
  constructor(capacity, drainPerSecond) {
    if (capacity < 0) throw new Error("capacity must be > 0");
    if (drainPerSecond <= 0) throw new Error("drainPerSecond must be > 0");

    this.capacity = capacity;
    this.drainPerSecond = drainPerSecond;
    this.level = 0;
    this.lastUpdate = Date.now();
  }

  allow(cost = 1) {
    if (cost <= 0) return true;

    const now = Date.now();
    const deltaSeconds = (now - this.lastUpdate) / 1000;

    // ✅ FIX: drain only once
    const leaked = deltaSeconds * this.drainPerSecond;
    this.level = Math.max(0, this.level - leaked);

    // round to avoid floating-point issues
    this.level = parseFloat(this.level.toFixed(4));
    this.lastUpdate = now;
    console.log(this.level + cost);
    if (this.level + cost <= this.capacity) {
      this.level += cost;
      return true;
    } else {
      return false;
    }
  }
}
const limiter = new LeakyBucketLimiter(5, 1);

setInterval(() => {
  const allowed = limiter.allow();
  console.log("Request:", allowed ? "✅ Allowed" : "❌ Denied");
}, 800);
