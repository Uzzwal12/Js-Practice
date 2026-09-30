const fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream/promises");

// Simple CLI arguments
const [, , action, fileName] = process.argv;

async function compress(file) {
  const source = fs.createReadStream(file);
  const destination = fs.createWriteStream(file + ".gz");
  const gzip = zlib.createGzip(); // transform

  await pipeline(source, gzip, destination);
  console.log(`✅ Compressed: ${file} → ${file}.gz`);
}

async function decompress(file) {
  const dest = fileName.replace(/\.gz$/, "");
  if (fs.existsSync(dest)) {
    const backup = dest + ".bak";
    console.log(`⚠️  ${dest} already exists. Renaming to ${backup}`);
    fs.renameSync(dest, backup);
  }
  const source = fs.createReadStream(file);
  const destination = fs.createWriteStream(dest);
  const gunzip = zlib.createGunzip();
  await pipeline(source, gunzip, destination);
  console.log(`✅ Decompressed to ${dest}`);
}

(async () => {
  try {
    if (action === "compress") {
      await compress(fileName);
    } else if (action === "decompress") {
      await decompress(fileName);
    } else {
      console.log("❌ Usage:");
      console.log("   node compressor.js compress <filename>");
      console.log("   node compressor.js decompress <filename.gz>");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
})();
