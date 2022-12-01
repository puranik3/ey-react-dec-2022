type Person = {
    readonly name: string,
    age?: number // optional property
};

const john : Person = {
    name: 'John',
    age: 32
};

const jane : Person = {
    name: 'Jane'
};

jane.age = 28;
// jane.spouse = john;

// john.name = 'Jonathan'; // error