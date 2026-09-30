const { parentPort, workerData } = require("worker_threads");

function heavy(n) {
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += i;
  }

  return sum;
}

const result = heavy(workerData.iterations);
parentPort.postMessage({ result });
