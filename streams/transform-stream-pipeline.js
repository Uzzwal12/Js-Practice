const { Transform } = require("stream");
const { createReadStream, createWriteStream } = require("fs");
const { pipeline } = require("stream/promises");

async function run() {
  const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const result = chunk.toString().toUpperCase();
      callback(null, result);
    },
  });
  try {
    await pipeline(
      createReadStream("input.txt", { encoding: "utf-8" }),
      upperCaseTransform,
      createWriteStream("output.txt", { encoding: "utf-8" })
    );
    console.log("✅ Done! File transformed to uppercase.");
  } catch (error) {
    console.error("❌ Something went wrong:", error);
  }
}

run();
