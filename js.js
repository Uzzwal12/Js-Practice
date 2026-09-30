function greet(age) {
  console.log(`Hello my name is ${this.name} and my age is ${age}`);
}

const obj = { name: "Uzzwal" };

greet.call(obj, 28);
greet.apply(obj, [28]);

const newGreet = greet.bind(obj, [28]);

newGreet();
