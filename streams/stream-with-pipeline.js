const http = require("http");
const fs = require("fs");
const { pipeline } = require("stream/promises");

const file = fs.createWriteStream("video.bin");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const url = "http://speedtest.tele2.net/100MB.zip";
async function download() {
  http.get(url, async (response) => {
    try {
      await pipeline(response, file);
      console.log("🎉 Download complete!");
    } catch (error) {
      console.log("error", error);
    }
  });
}

download();
