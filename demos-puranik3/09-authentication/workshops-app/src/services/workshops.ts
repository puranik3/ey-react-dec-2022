import axios from 'axios';
import IWorkshop from '../models/IWorkshop';
import { KEY_TOKEN } from './auth';

// const getHeaders = () => ({
//     headers: {
//         Authorization: `Bearer ${localStorage.getItem( KEY_TOKEN )}`
//     }
// });

const getWorkshops = async ( _page : number ) => {
    const response = await axios.get( `/workshops`,
        {
            params: {
                // _page: _page
                _page
            },
            // ...getHeaders()
        }
    );
    return response.data as IWorkshop[];
};

const getWorkshopById = async ( id : string | number ) => {
    const response = await axios.get( `/workshops/${id}` );
    return response.data as IWorkshop;
};

export {
    getWorkshops,
    getWorkshopById
};