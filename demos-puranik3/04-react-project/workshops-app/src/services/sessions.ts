import axios from 'axios';
import ISession from '../models/ISession';

const getSessionForWorkshopWithId = async ( id : string | number ) => {
    const response = await axios.get( `/workshops/${id}/sessions` );
    return response.data as ISession[];
};

export {
    getSessionForWorkshopWithId
};