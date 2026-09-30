// function flat(arr) {
//   let result = [];
//   for (let item of arr) {
//     if (Array.isArray(item)) {
//       result.push(...flat(item));
//     } else {
//       result.push(item);
//     }
//   }

//   return result;
// }

// let array = [1, 2, [3, 4], 5, [6, 7, [8, 9]], 10];
// console.log(flat(array));
const deepObj = {
  id: 1,
  name: "Uzzwal",
  isActive: true,
  details: {
    age: 26,
    address: {
      street: "MG Road",
      city: "Bangalore",
      coordinates: {
        lat: 12.9716,
        lon: 77.5946,
      },
    },
    hobbies: [
      "coding",
      "gym",
      { type: "music", instruments: ["guitar", "piano"] },
    ],
  },

  meta: {
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date(),
  },

  tasks: [
    {
      id: 101,
      title: "Learn NodeJS",
      tags: ["backend", "javascript"],
      isCompleted: false,
    },
    {
      id: 102,
      title: "Kubernetes Practice",
      progress: { done: 40, total: 100 },
    },
  ],

  settings: new Map([
    ["theme", "dark"],
    ["fontsize", 14],
  ]),

  permissions: new Set(["read", "write", "delete"]),

  greet() {
    console.log("Hello from deep object!");
  },
};

function deepClone(obj) {
  let result = {};
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    let cloneArr = [];
    for (let item of obj) {
      cloneArr.push(deepClone(item));
    }
    return cloneArr;
  }

  for (let key in obj) {
    result[key] = deepClone(obj[key]);
  }
  return result;
}

const res = deepClone(deepObj);
res.details.age = 10;
console.log(res);
console.log(deepObj);
