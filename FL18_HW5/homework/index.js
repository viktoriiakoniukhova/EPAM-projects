// 0. Avoiding magic numbers warnings
const num1 = 3, num2 = 5, num3 = -1, num4 = 8;
const num5 = 4, num6 = 2, num7 = 9;
const num0 = 0, num8 = -3, num9 = 7;
// 1. Function isEquals()
function isEquals(arg1, arg2) {
  return arg1 === arg2;
}

console.log(isEquals(num1, num1));
// 2. Function isBigger()
function isBigger(arg1, arg2) {
  if (arg1 > arg2) {
  return arg1 > arg2;
}
  return arg1 < arg2;
}

console.log(isBigger(num2, num3));
// 3. Function storeNames()
const storeNames = (...args) => args;

console.log(storeNames('Tommy Shelby', 'Ragnar Lodbrok', 'Tom Hardy'));
// 4. Function getDifference()
function getDifference(arg1, arg2) {
  const argA = arg1;
  const argB = arg2;
  if (arg2 > arg1) {
    return argB - argA;
  }
  return argA - argB;
}

console.log(getDifference(num2, num1));
console.log(getDifference(num2, num4));
// 5. Function negativeCount()
function negativeCount(numArray) {
  let counter = 0;
  for (let i = 0; i < numArray.length; i += 1) {
    if (numArray[i] < 0) {
  counter += 1;
  }
  }
  return counter;
}

console.log(negativeCount([num5, num1, num6, num7]));
console.log(negativeCount([num0, num8, num2, num9]));
// 6. Function letterCount()
function letterCount(str1, str2) {
  const regEx = new RegExp(str2, 'g');
  return (str1.match(regEx) || []).length;
}

console.log(letterCount('Marry', 'r'));
console.log(letterCount('Barny', 'y'));
console.log(letterCount('', 'z'));
// 7. Function countPoints()
function countPoints(arr) {
  let result = 0;
  const numberThree = 3;
  const newArr = arr.map((value) => value.split(':').map((value1) => +value1));
  for (const item of newArr) {
    if (item[0] > item[1]) {
      result += numberThree;
    }
    if (item[0] === item[1]) {
      result += 1;
    }
  }
  return result;
}
console.log(countPoints(['100:90', '110:98', '100:100', '95:46', '54:90', '99:44', '90:90', '111:100']));
