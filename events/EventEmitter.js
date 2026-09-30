const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("userRegistered", (user) => {
  console.log(`New user registered: ${user.name}`);
});

emitter.emit("userRegistered", { name: "Alice" });
