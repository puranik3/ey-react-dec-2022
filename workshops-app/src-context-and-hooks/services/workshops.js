import axios from 'axios';

export const getWorkshops = async () => {
    try {
        const response = await axios.get( `http://workshops-server.herokuapp.com/workshops` );
        return response.data;
    } catch( error ) {
        throw error;
    }
}

export const getWorkshopById = async ( id ) => {
    try {
        const response = await axios.get( `http://workshops-server.herokuapp.com/workshops/${id}` );
        return response.data;
    } catch( error ) {
        throw error;
    }
}

export const getWorkshopWithSessionsById = async ( id ) => {
    try {
        const response = await axios.get( `http://workshops-server.herokuapp.com/workshops/${id}?_embed=sessions` );
        return response.data;
    } catch( error ) {
        throw error;
    }
}