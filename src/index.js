"use strik";
const arr = [1, 2, 3];

const myEvery = (arr, callback, thisArr) => {
  for (let i = 0; i < arr.length; i++) {
    if (!callback.call(thisArr, arr[i], i, arr)) {
      return false;
    }
  }
  return true;
};
