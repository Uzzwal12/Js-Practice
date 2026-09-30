class CustomEventEmitter {
  constructor() {
    this.events = {};
  }

  //subscribe
  on(eventName, listener) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(listener);
  }

  //emit
  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((listener) => listener(...args));
    }
  }

  //remove listener
  off(eventName, listener) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (l) => l !== listener
      );
    }
  }
}

const myEmitter = new CustomEventEmitter();

function greet(name) {
  console.log("Hello", name);
}

myEmitter.on("greet", greet);

myEmitter.emit("greet", "uzzwal");

myEmitter.off("greet", greet);

myEmitter.emit("greet", "kk");
