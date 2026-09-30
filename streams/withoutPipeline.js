const http = require("http");
const fs = require("fs");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const url = "http://speedtest.tele2.net/100MB.zip";
const file = fs.createWriteStream("video.bin");

http.get(url, (response) => {
  console.log("⏬ Download started...");

  response.on("data", (chunk) => {
    const canContinue = file.write(chunk);

    if (!canContinue) {
      response.pause();
      console.log("⚠️ Backpressure: Paused downloading...");

      file.once("drain", () => {
        console.log("✅ Drain: Resuming download...");
        response.resume();
      });
    }
  });

  response.on("end", () => {
    file.end();
    console.log("🎉 Download complete!");
  });

  response.on("error", (err) => {
    console.error("❌ Download failed:", err);
  });
});
