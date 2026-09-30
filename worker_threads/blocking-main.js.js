const { parentPort } = require("worker_threads");

parentPort.on("message", async (job) => {
  if (job.type === "email") {
    await new Promise((r) => setTimeout(r, 1000));
    parentPort.postMessage({ id: job.id, status: "sent" });
  }
});
