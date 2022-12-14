import axios from 'axios';

const getWorkshops = async ( page ) => {
    const response = await axios.get( `https://workshops-server.herokuapp.com/workshops?_page=${page}` )
    return response.data;
}

const getWorkshopById = async ( id ) => {
    const response = await axios.get( `https://workshops-server.herokuapp.com/workshops/${id}` )
    return response.data;
}

export {
    getWorkshops,
    getWorkshopById
};