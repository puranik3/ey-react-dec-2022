import axios from 'axios';

const getWorkshops = async ( _page : number ) => {
    const response = await axios.get( `/workshops`,
        {
            params: {
                // _page: _page
                _page
            }
        }
    );
    return response.data;
};

const getWorkshopById = async ( id : string | number ) => {
    const response = await axios.get( `/workshops/${id}` );
    return response.data;
};

export {
    getWorkshops,
    getWorkshopById
};