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

const johnDeepCopy = {
    ...john, // name, age are fine. We want to overwrite emails, address with proper copies
    emails: [ // this arrays has only strings -> it is a proper copy
        ...john.emails
    ],
    address: { // proper copy
        ...john.address
    }
};

johnDeepCopy.age++; // john.age is still 32
johnDeepCopy.emails[0] = 'john@yahoo.com'; // john.emails[0] has NOT changed

console.log( john );
