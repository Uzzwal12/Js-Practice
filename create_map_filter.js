// polly fill style

// Time complexity: O(n) for all.

// Space complexity
// map → O(n) new array.
// filter → O(k) new array (≤ n).
// reduce → O(1) extra space.

/* 
1. We are attaching myMap to Array so that all arrays can access this
2. this here points to the array for which this func is called
3. result will hold transformed values to return
4. if (i in this) checks if index exists ([1,,2]) for this kind of situations
5. callback.call(thisArg, this[i], i, this) Invokes the callback function,
binding thisArg as its this value inside the callback.
6.Passes three arguments: element, index, original array — exactly like the native .map() does.
7 Adds the transformed value returned by the callback into result.
*/
Array.prototype.myMap = function (callback, thisArgs) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result.push(callback.call(thisArgs, this[i], i, this));
    }
  }
  return result;
};

/* 
1. We are attaching myMap to Array so that all arrays can access this
2. this here points to the array for which this func is called
3. result will hold transformed values to return
4. if (i in this && callback.call(...)) First i in this: skip holes (just like .map() does).
Then run the callback: if it returns a truthy value, include the element in the result.
5. Unlike map, filter adds the original element to result (not the callback’s return value).
*/

Array.prototype.myFilter = function (callback, thisArgs) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArgs, this[i], i, this)) {
      result.push(this[i]);
    }
  }

  return result;
};

/*
1. Initialize accumulator and startIndex
2. If no initialValue was passed
Check accumulator === undefined — this means user didn’t pass the second argument.
If the array is empty (this.length === 0), throw a TypeError — this matches native .reduce() behavior.
Otherwise, take the first element (this[0]) as the initial accumulator and set startIndex = 1.
3. If initialValue was passed We start at index 0 because we already have an accumulator value to combine with every element.
4. Call the callback with (accumulator, currentElement, index, array) and update accumulator with the returned value.
5. After the loop, accumulator holds the final reduced value.
*/

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      accumulator = callback.call(accumulator, this[i], i, this);
    }
  }

  return accumulator;
};
