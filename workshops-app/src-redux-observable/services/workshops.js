import axios from 'axios';
import { ajax } from 'rxjs/ajax';
import { tap, map, mergeMap } from 'rxjs/operators';

export default {
    apiBaseUrl: 'https://workshops-server.herokuapp.com',
    getWorkshops() {
        return axios.get( `${this.apiBaseUrl}/workshops` ).then( response => response.data );
    },
    getWorkshopsByPage( page, limit ) {
        console.log( 'getWorkshopsByPage : ', page, limit );

        return ajax( `${this.apiBaseUrl}/workshops?_page=${page}&_limit=${limit}` ).pipe(
            tap( resp => console.log( 'resp = ', resp ) ),
            map( response => {
                return {
                    workshops: response.response,
                    total: response.xhr.getResponseHeader( 'x-total-count' )
                };
            })
        );
    },
    getWorkshopById( id, includeSessions ) {
        const config = includeSessions ? { params: { _embed: 'sessions' } } : {};
        return axios.get( `${this.apiBaseUrl}/workshops/${id}`, config ).then( response => response.data );
    }
}