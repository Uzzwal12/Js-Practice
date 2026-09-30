const fs = require("fs");
const readline = require("readline");

async function processLogFile(filePath, outputPath) {
  let counts = { error: 0, warning: 0, info: 0 };

  // Create file stream
  const fileStream = fs.createReadStream(filePath);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    if (/error/i.test(line)) {
      counts.error++;
    } else if (/warn/i.test(line)) {
      counts.warning++;
    } else if (/info/i.test(line)) {
      counts.info++;
    }
  }

  const summary = {
    file: filePath,
    total: counts.error + counts.warning + counts.info,
    counts,
    generatedAt: new Date().toISOString(),
  };

  const jsonOutput = JSON.stringify(summary, null, 2);

  if (outputPath) {
    fs.writeFileSync(outputPath, jsonOutput, "utf-8");
    console.log(`✅ Summary written to ${outputPath}`);
  } else {
    console.log(jsonOutput);
  }
}

const args = process.argv.slice(2);
const inputFile = args[0];
const outputFile = args[1];

if (!inputFile) {
  console.error(
    "❌ Please provide input log file.\nUsage: node log-processor.js app.log summary.json"
  );
  process.exit(1);
}

processLogFile(inputFile, outputFile);
