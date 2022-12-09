import axios from 'axios';

const getWorkshops = async ( _page : number ) => {
    const response = await axios.get(
        `https://workshops-server.herokuapp.com/workshops`,
        {
            params: {
                // _page: _page
                _page
            }
        }
    );
    return response.data;
};

export {
    getWorkshops
};