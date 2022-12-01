// 3 scenarios
// 1. to gather function arguments, for a function having variable number of arguments
const foo = ( x, y, ...restOfArgs ) => {
    console.log( x, y, restOfArgs );
};

foo( 10, 20, 30, 40 ); // x = 10, y = 20, restOfArgs = [ 30, 40 ]
foo( 10, 20, 30, 40, 50 ); // same, restOfArgs = [ 30, 40, 50 ]
foo( 10, 20, 30, 40, 50, 60 ); // same, restOfArgs = [ 30, 40, 50, 60 ]

// 2. while array destructuring, to gather rest of the array items into another array
const weekdays = [
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri'
];

const [ first, second, ...restOfWeekdays ] = weekdays;
console.log( first, second, restOfWeekdays );

// 3. while object destructuring, to gather rest of the properties items into another object
const john = {
    name: 'Jonathan Doe',
    age: 32,
    emails: [
        'john@gmail.com',
        'john@ey.com'
    ],
    address: {
        city: 'Bangalore',
        pinCode: 560050,
        area: 'Koramangala'
    }
};

const {
    name,
    address: {
        city,
        ...restOfAddress
    },
    ...restOfJohn
} = john;
console.log( name, city, restOfJohn, restOfAddress );