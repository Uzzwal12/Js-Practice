const { Worker } = require("worker_threads");
const path = require("path");

const worker = new Worker(path.resolve(__dirname, "blocking-main.js"));

const queue = [
  { id: 1, type: "email", payload: { to: "a@test.com" } },
  { id: 2, type: "email", payload: { to: "b@test.com" } },
  { id: 3, type: "email", payload: { to: "c@test.com" } },
];

function sendEmail() {
  if (queue.length === 0) {
    console.log("All done");
    worker.terminate().then((code) => {
      console.log("Worker terminated with code", code);
    });
    return;
  }
  const job = queue.shift();
  console.log("sending job:", job);
  worker.postMessage(job);
}

worker.on("message", (msg) => {
  console.log("Email sent", msg);
  sendEmail();
});

sendEmail();
