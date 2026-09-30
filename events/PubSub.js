class PubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => {
      this.subscribers[event] = this.subscribers[event].filter(
        (cb) => cb !== callback
      );
    };
  }

  publish(event, data) {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((cb) => {
        cb(data);
      });
    }
  }
}

const pubSub = new PubSub();

const unSubLogger = pubSub.subscribe("postCreated", (post) => {
  console.log(`Logger: New post created -> ${post.title}`);
});

// Subscriber 2
pubSub.subscribe("postCreated", (post) => {
  console.log(`Analytics: Counting new post -> ${post.title}`);
});

// Publisher
pubSub.publish("postCreated", { title: "EventEmitter vs pubSub in Node.js" });

unSubLogger();

pubSub.publish("postCreated", { title: "Second post after unsubscribe" });
