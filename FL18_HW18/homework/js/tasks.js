// 1. Max Even Element
const arr = ['1','3','4','2','5'];

function getMaxEvenElement(arr) {
    return Math.max.apply(null, arr);
}

getMaxEvenElement(arr);

// 2. Swap Two Variables
let a = 3;
let b = 5;

[a,b] = [b,a];

a;
b;

// 3.  Nullish Coalescing Operator
function getValue(value) {
    return value ?? '-';
}
getValue(0);
getValue('Some Text');
getValue(null);
getValue(undefined);

// 4. Object From Array Of Arrays
const arrayOfArrays = [
    ['name', 'dan'],
    ['age', '21'],
    ['city', 'lviv']
];

function getObjFromArray(array) {
    return Object.assign({}, ...array.map(
        ([ key, value ]) => ({ [key]: value }))
    );
}
getObjFromArray(arrayOfArrays);
// 5. Object Extra Property
const obj1 = {name: 'Nick'};

function addUniqueId(obj) {
    let copyObj = obj.constructor();
    for (let attr in obj) {
        if (obj.hasOwnProperty(attr)) {
            copyObj[attr] = obj[attr];
        }
    }
    copyObj.id = Symbol();
    return copyObj;
}
addUniqueId(obj1);
addUniqueId({name: 'Buffy'});

Object.keys(obj1).includes('id');

// 6. Regroup Object Properties
// const oldObj = {
//     name: "Willow",
//     details: {id: 1, age: 47, university: "LNU"}
// };
// function getRegroupedObject(oldObj) {
//
// }
//
// console.log(getRegroupedObject(oldObj));

// 7. Find Unique Elements
const arr1 = [2, 3, 4, 2, 4, 'a', 'c', 'a'];

function getArrayWithUniqueElements(arr) {
    // const uniqueArr = new Set(arr);
    // const back2Arr = [...uniqueArr];
    // return back2Arr;
    return Array.from(new Set(arr));
}
getArrayWithUniqueElements(arr1);

// 8. Hide Phone Number
const phoneNumber = '0123456789';

function hideNumber(num) {
    const subNum = num.substr(0,6);

    let nSubNum = subNum.replace(/[0-9]/g, '*');
    return num.replace(subNum, nSubNum);
}
hideNumber(phoneNumber);

// 9. Required Parameters 
function add(a = required('a'), b = required('b')) {
    return a + b;
}
function required(param) {
    throw new Error(`${param} is required`);
}

add(2,3);

// 10. Iterable Sequence
function * generateIterableSequence(){
    yield 'I'
    yield 'Love'
    yield 'EPAM'
}

const generatorObject = generateIterableSequence();

for(let value of generatorObject){
    value;
}