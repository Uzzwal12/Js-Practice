const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "large.txt");

const readStream = fs.createReadStream(filePath, { encoding: "utf-8" });

readStream.on("data", (chunk) => {
  console.log("📦 Received chunk of size:", chunk.length);
});

readStream.on("end", () => {
  console.log("✅ Finished reading file");
});

readStream.on("error", (err) => {
  console.error("❌ Error reading file:", err);
});

const textToAppend = "\nThis is new content appended at " + new Date();

fs.appendFile(filePath, textToAppend, (err) => {
  if (err) {
    console.error("❌ Error appending:", err);
    return;
  }
  console.log("✅ Text appended successfully!");
});
