'use strict';

function MyArray() {
  this.length = 0;
  for (let i = 0; i < arguments.length; i++) {
    this[i] = arguments[i];
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
      const currentArg = args[i];
      if (MyArray.isMyArray(currentArg)) {
        for (let j = 0; j < currentArg.length; j++) {
          res.push(currentArg[j]);
        }
      } else {
        res.push(currentArg);
      }
    }
    return res;
  };

  this.flat = function (depth = 1) {
    let result = new MyArray();

    this.forEach((item) => {
      if (MyArray.isMyArray(item) && depth > 0) {
        const flattenedSubArray = item.flat(depth - 1);
        result = result.concat(flattenedSubArray);
      } else {
        result = result.concat(item);
      }
    });

    return result;
  };
}

MyArray.prototype = new MyArrayProto();

const myArr1 = new MyArray([1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]]);
const nested = new MyArray(myArr1); // [[1, 2], [3, 4], 5]


const flatResult = nested.flat(1);
console.log(flatResult);