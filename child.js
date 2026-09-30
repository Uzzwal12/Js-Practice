console.log("Hello from child process!");
console.log("Arguments received:", process.argv.slice(2));

setTimeout(() => {
  console.log("Child process finished!");
}, 2000);
