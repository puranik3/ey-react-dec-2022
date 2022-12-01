// spread - ...
// copying/merging arrays/object

const numbers1 = [ 10, 20, 30 ], numbers2 = [ 40, 50, 60 ];
const numbers = [ ...numbers1 ]; // [ numbers1[0], numbers1[1], numbers1[2] ] -> items which are primitives (numbers) are copied by value

console.log( 'numbers === numbers1 : ', numbers === numbers1 ); // false

numbers[0]++;

console.log( numbers, numbers1 );

const concatNumbers = [ ...numbers1, ...numbers2 ];
console.log( concatNumbers );

const persons1 = [
    { name: 'John', age: 32 },
    { name: 'Jane', age: 28 },
    { name: 'Mark', age: 40 }
];

const persons = [ ...persons1 ]; // the items which are objects are copied by reference

console.log( persons === persons1 ) // false (the arrays are different)
console.log( persons[0] === persons1[0] ); // true (the first 3 items within them are the same)

persons[0].age++; // 33

console.log( persons1[0].age ); // also 33