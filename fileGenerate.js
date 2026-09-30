const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "large.txt");

const writeStream = fs.createWriteStream(filePath);

console.log("⏳ Generating large file...");

for (let i = 0; i < 5_000_000; i++) {
  const line = `This is line number ${i}\n`;
  const ok = writeStream.write(line);
  if (!ok) {
    // Backpressure handling — wait before writing more
    writeStream.once("drain", () => {});
  }
}

writeStream.end(() => {
  console.log("✅ Large file generated:", filePath);
});
