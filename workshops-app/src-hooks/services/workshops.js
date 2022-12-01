import axios from 'axios';

export default {
    apiBaseUrl: 'https://workshops-server.herokuapp.com',
    getWorkshops() {
        return axios.get( `${this.apiBaseUrl}/workshops` ).then( response => response.data );
    },
    getWorkshopsByPage( page, limit ) {
        return axios.get( `${this.apiBaseUrl}/workshops?_page=${page}&_limit=${limit}` )
                    .then( response => {
                        return {
                            workshops: response.data,
                            total: parseInt( response.headers['x-total-count'] )
                        };
                    })
    },
    getWorkshopById( id, includeSessions ) {
        const config = includeSessions ? { params: { _embed: 'sessions' } } : {};
        return axios.get( `${this.apiBaseUrl}/workshops/${id}`, config ).then( response => response.data );
    }
}