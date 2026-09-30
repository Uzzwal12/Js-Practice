// Define a Node for Doubly Linked List
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

// Setup Cache with Capacity, Map, and Dummy Head/Tail
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node(null, null);
    this.tail = new Node(null, null);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // Private Helpers - Remove a node from its current position:
  #remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  // Private Helpers - Add a node right after head (most recent position)
  #add(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  /*
    If not in map → return -1.
    If in map → move node to front (MRU) and return its value.
 */
  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this.#remove(node);
    this.#add(node);
    return node.value;
  }

  /*
    If key exists → update value and move node to front.
    If key doesn’t exist:
        If cache full → remove LRU (node before tail) and delete from map.
        Insert new node at front and save in map.
  */
  put(key, value) {
    if (this.map.has(key)) {
      let existing = this.map.get(key);
      existing.value = value;
      this.#remove(existing);
      this.#add(existing);
    } else {
      if (this.map.size >= this.capacity) {
        let lru = this.tail.prev;
        this.#remove(lru);
        this.map.delete(lru.key);
      }
      let newNode = new Node(key, value);
      this.#add(newNode);
      this.map.set(key, newNode);
    }
  }
}

// Test 1: cache size of 2;

let cache1 = new LRUCache(2);

cache1.put(1, "A");
cache1.put(2, "B");
console.log(cache1.get(1)); // A (1 is recently used)
cache1.put(3, "C"); // evicts key 2
console.log(cache1.get(2)); // -1
cache1.put(4, "D"); // evicts key 1
console.log(cache1.get(1)); // -1
console.log(cache1.get(3)); // C
console.log(cache1.get(4)); // D
