const fs = require("fs");
const util = require("util");

// problem
fs.readFile("user.json", "utf-8", (err, data) => {
  if (err) return console.error("Error reading file:", err);
  let user;
  try {
    user = JSON.parse(data);
  } catch (error) {
    return console.error("Invalid JSON:", parseErr);
  }
  fs.readFile(`${user.profile}.json`, "utf8", (err, profileData) => {
    if (err) return console.error("Error reading profile:", err);

    console.log("User profile data:", profileData);
  });
});

// to solve this nested err and callback we use util.promisify

const readFileAsync = util.promisify(fs.readFile);

readFileAsync("user.json", "utf-8")
  .then((data) => {
    let user = JSON.parse(data.user);
    return readFileAsync(`${user.profile}.json`, "utf8");
  })
  .then((profileData) => {
    console.log("User profile data:", profileData);
  })
  .catch((err) => {
    console.log("err", err);
  });

// async await

async function main() {
  try {
    const userData = await readFileAsync("user.json", "utf-8");
    const user = JSON.parse(userData);
    const profileData = await readFileAsync(`${user.profile}.json`, "utf8");
    console.log(user, profileData);
  } catch (error) {}
  console.error("Error:", error);
}

main();
