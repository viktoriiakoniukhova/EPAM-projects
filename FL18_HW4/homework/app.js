// 1. Write a JavaScript function that reverse an integer number.
function reverseNumber(number) {
  let num = number;
  const sign = Math.sign(num);
  if (num < 0) {
    num *= -1;
  }
  let lastDigit;
  let reversedNumber = 0;
  while (num !== 0) {
    lastDigit = num % 10;
    num = Math.floor(num / 10);
    reversedNumber = reversedNumber * 10 + lastDigit;
  }
  return sign * reversedNumber;
}

reverseNumber(-1234);

// 2. Write function, which iterates over array and executes function on each element.
function forEach(array, execFunction) {
  for (let i = 0; i < array.length; i += 1) { execFunction(array[i]); }
}

forEach([2, 5, 8], (el) => { console.log(el); });
// 3. Write function, which returns transformed array based on function, which is passed as a
// parameter. Reuse function from task 2.
function map(array, execFunction) {
  const returnArray = [];
  function func(arrayElement) { returnArray.push(execFunction(arrayElement)); }
  forEach(array, func);
  return returnArray;
}

map([2, 5, 8], (el) => el + 3);
map([1, 2, 3, 4, 5], (el) => el * 2);
// 4. Write function, which returns filtered array based on function, which passed as a parameter.
// Reuse function from task 2.
function filter(array, execFunction) {
  const returnArray = [];
  function pushElement(arrayElement) {
    if (execFunction(arrayElement)) { returnArray.push(arrayElement); }
  }
  forEach(array, pushElement);
  return returnArray;
}

filter([2, 5, 1, 3, 8, 6], (el) => el > 3);
filter([1, 4, 6, 7, 8, 10], (el) => el % 2 === 0);
// 5. Write function, which returns array of names of people, who are over 18 and their favorite
// fruit is apple. Reuse functions from task 3 and 4.
const data = [
  {
    _id: '5b5e3168c6bf40f2c1235cd6',
    index: 0,
    age: 39,
    eyeColor: 'green',
    name: 'Stein',
    favoriteFruit: 'apple',
  },
  {
    _id: '5b5e3168e328c0d72e4f27d8',
    index: 1,
    age: 38,
    eyeColor: 'blue',
    name: 'Cortez',
    favoriteFruit: 'strawberry',
  },
  {
    _id: '5b5e3168cc79132b631c666a',
    index: 2,
    age: 2,
    eyeColor: 'blue',
    name: 'Suzette',
    favoriteFruit: 'apple',
  },
  {
    _id: '5b5e31682093adcc6cd0dde5',
    index: 3,
    age: 17,
    eyeColor: 'green',
    name: 'Weiss',
    favoriteFruit: 'banana',
  }];

function getAdultAppleLovers(dataFile) {
  function func(arrayElement) {
    return arrayElement.age > 18 && arrayElement.favoriteFruit === 'apple';
  }
  const filteredAge = filter(dataFile, func);
  return map(filteredAge, (el) => el.name);
}

getAdultAppleLovers(data);
// 6. Write function, which returns array of keys of an object.
function getKeys(object) {
  const array = [];
  for (const key in object) {
    if ({}.hasOwnProperty.call(object, key)) {
      array.push(key);
    }
  }
  return array;
}

getKeys({ keyOne: 1, keyTwo: 2, keyThree: 3 });
// 7. Write function, which returns array of values of an object.
function getValues(object) {
  const array = [];
  for (const key in object) {
    if ({}.hasOwnProperty.call(object, key)) {
      array.push(object[key]);
    }
  }
  return array;
}

getValues({ keyOne: 1, keyTwo: 2, keyThree: 3 });
// 8. Write function, which returns formatted date.
function showFormattedDate(date) {
  const day = date.getDate();
  const year = date.getFullYear();
  const shortMonth = date.toLocaleString('en-US', { month: 'short' });
  return `It is ${day} of ${shortMonth}, ${year}`;
}

showFormattedDate(new Date('2018-08-27T01:10:00'));
