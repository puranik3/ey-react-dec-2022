interface IPerson {
    readonly name: string,
    age: number,
    celebrateBirthday: () => void
};

// 1. Use an interface to type an object
const john : IPerson = {
    name: 'John',
    age: 32,
    celebrateBirthday() {
        this.age++;
    }
};

// 2. Implement an interface in a class
class Person implements IPerson {
    // public readonly name: string;
    // public age: number;

    constructor( public name : string, public age : number ) {
        // this.name = name;
        // this.age = age;
    }

    celebrateBirthday() {
        this.age++;
    }
}