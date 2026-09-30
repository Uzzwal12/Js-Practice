const Scheduler = require("./scheduler");
const s = new Scheduler();

// Example 1: one-off job, runs 3 seconds from now
const runAt = new Date(Date.now() + 8000);
s.scheduleAt(runAt, () => {
  console.log("🔥 One-off job executed at", new Date().toLocaleTimeString());
});
console.log("⏳ One-off job scheduled for", runAt.toLocaleTimeString());

// Example 2: recurring job every 2 seconds
const recurring = s.scheduleRecurring(2000, () => {
  console.log("⏲️  Recurring job tick at", new Date().toLocaleTimeString());
});

// Cancel recurring job after 7 seconds
setTimeout(() => {
  console.log("🛑 Cancelling recurring job");
  s.cancel(recurring);
}, 7000);
