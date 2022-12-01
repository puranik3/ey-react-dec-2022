// implicit type assignment
// primitive type -> number, boolean, string
let x = 1;
// x = true; // error

// data type is 'any' -> we can assign any value! point of typescript is lost
// we avoid using any type
let amount;
amount = 1000;
amount = true;

let price : number;
price = 1000;
// price = true; // error
