const { fork, spawn, exec } = require("child_process");

// 1. exec -> Runs a command in a shell, buffers entire output
exec("node child.js arg1 arg2", (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log("exec output:");
  console.log(stdout);
});

// 2. spawn -> Streams output (good for large data or continuous logs)
const childSpawn = spawn("node", ["child.js", "argA", "argB"]);

childSpawn.stdout.on("data", (data) => {
  console.log(`spawn stdout: ${data}`);
});

childSpawn.stderr.on("data", (data) => {
  console.error(`spawn stderr: ${data}`);
});

childSpawn.on("close", (code) => {
  console.log(`spawn process exited with code ${code}`);
});

// 3. fork -> Special for running another Node.js script, gives IPC channel
const childFork = fork("child.js", ["argX", "argY"]);

childFork.on("message", (msg) => {
  console.log("Message from forked child:", msg);
});

// You can send messages to forked child
childFork.send({ from: "parent", data: "Hello child!" });
