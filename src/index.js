"use strict";

function MyArray() {
  this.length = 0;

  for (let i = 0; i < arguments.length; i++) {
    this[this.length] = arguments[i];
    this.length++;
  }
}

MyArray.isMyArray = function (obj) {
  return obj instanceof MyArray;
};

function MyArrayProto() {
  this.push = function () {
    for (let i = 0; i < arguments.length; i++) {
      this[this.length++] = arguments[i];
    }
    return this.length;
  };

  this.forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
      callback(this[i], i, this);
    }
  };

  this.concat = function (...args) {
    const res = new MyArray();

    for (let i = 0; i < this.length; i++) {
      res.push(this[i]);
    }

    for (let i = 0; i < args.length; i++) {
      if (MyArray.isMyArray(args[i])) {
        for (let j = 0; j < args[i].length; j++) {
          res.push(args[i][j]);
        }
      } else {
        res.push(args[i]);
      }
    }

    return res;
  };

  this.flat = function (depth = 1) {
    const result = new MyArray();

    this.forEach((item) => {
      if (MyArray.isMyArray(item) && depth > 0) {
        const flattened = item.flat(depth - 1);
        flattened.forEach((el) => result.push(el));
      } else {
        result.push(item);
      }
    });

    return result;
  };
}

MyArray.prototype = new MyArrayProto();

const arr1 = new MyArray(1, 2, new MyArray(3, 4));
console.log("Test 1:", arr1.flat());

const arr2 = new MyArray(1, 2, new MyArray(3, 4, new MyArray(5, 6)));
console.log("Test 2:", arr2.flat());

console.log("Test 3:", arr2.flat(2));

const arr4 = new MyArray(1, new MyArray(2, new MyArray(3, new MyArray(4))));
console.log("Test 4 (Infinity):", arr4.flat(Infinity));
