const fs = require("fs");

fs.mkdir("test", (err) => {
  if (err) return console.error("Error creating directory:", err);
  console.log("Directory created");

  fs.writeFile("test/hello.text", "Hello world", (err) => {
    if (err) return console.error("Error creating directory:", err);
    console.log("File written!");

    fs.appendFile("test/hello.text", "data appended", (err) => {
      if (err) return console.error("Error creating directory:", err);
      console.log("new data added!");

      fs.readFile("test/hello.text", "utf-8", (err, data) => {
        if (err) return console.error("Error creating directory:", err);
        console.log(data);

        fs.unlink("test/hello.text", (err) => {
          if (err) return console.error("Error creating directory:", err);
          console.log("File deleted!");
          fs.rmdir("test", (err) => {
            if (err) return console.error("Error removing directory:", err);

            console.log("Directory removed!");
          });
        });
      });
    });
  });
});
