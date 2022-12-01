type BinaryFunction = ( x : number, y : number ) => number;

const sum : BinaryFunction = ( x, y ) => {
    return x + y;
};

const result = sum( 12, 13 );