import axios from 'axios';

const getWorkshops = async () => {
    console.log( 'before axios call' );

    try {
        const response = await axios.get( `https://workshops-server.herokuapp.com/workshops` ); // the function "pauses" on this line
        // console.log( response.data );
        return response.data;
    } catch( error ) {
        console.log( error.message );
    }

    console.log( 'after axios call' );
};

const helper = async () => {
    const data = await getWorkshops();
    console.log( data );
    console.log( 'after getting workshops' );
}

helper();

console.log( 'last line of script' );
