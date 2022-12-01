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

const johnEmployment = {
    company: 'E&Y',
    role: 'Web Developer'
};

const johnCopy = {
    spouse: 'Jane Doe',
    // name: 'Johnny',
    ...john, // name: john.name (copied by value), age: john.age (copied by value), emails: john.emails (copied by reference), address: john.address (copied by reference)
    name: 'Johnny',
    ...johnEmployment
};

johnCopy.age++; // john.age is still 32
johnCopy.emails[0] = 'john@yahoo.com'; // john.emails[0] is changed

console.log( john );
console.log( johnCopy );