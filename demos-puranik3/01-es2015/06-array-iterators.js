// array methods - sort(), find(), filter(), map(), reduce()
const numbers = [ 5, 10, 15, 20, 8, 17 ];

// first number > 12
// find() is used for finding the first item that matches a condition
let result;

result = numbers.find( item => item > 12 );
console.log( result );

// all numbers > 12
result = numbers.filter( item => item > 12 );
console.log( result ); // [ 15, 20, 17 ]

numbers.sort(
    ( item1, item2 ) => { // this is called by sort() internally whenever it wants to decide which of item1 and item2 comes earlier in sorted order (return -ve if item1 comes before, and +ve for item2 before)
        return item1 - item2;
    }
);
console.log( numbers );