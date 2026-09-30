console.log("1"); // Call stack

setTimeout(() => {
  // Callback queue (macrotask)
  console.log("3");
}, 0);

process.nextTick(() => {
  // Microtask (higher priority than Promise)
  console.log("nextTick");
});

Promise.resolve().then(() => {
  // Microtask
  console.log("4");
});

console.log("2"); // Call stack
