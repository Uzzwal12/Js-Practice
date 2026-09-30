const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter a number greater than 1: ", (ans) => {
  let inputNum = Number(ans);

  if (inputNum < 2 || isNaN(inputNum)) {
    console.log("❌ Please provide a valid number greater than 1");
    rl.close();
    return;
  }

  let num = inputNum;
  let result = [];

  for (let i = 2; i <= num; i++) {
    while (num % i === 0) {
      result.push(i);
      num = num / i;
    }
  }

  const uniqueFactors = [...new Set(result)];

  console.log(
    `✅ Unique prime factors of ${inputNum}: ${uniqueFactors.join(", ")}`
  );
  rl.close();
});
