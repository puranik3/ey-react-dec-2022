import axios from 'axios';

export default {
    apiBaseUrl: 'https://workshops-server.herokuapp.com',
    upvote( id ) {
        return axios.put( `${this.apiBaseUrl}/sessions/${id}/upvote` ).then( response => response.data );
    },
    downvote( id ) {
        return axios.put( `${this.apiBaseUrl}/sessions/${id}/downvote` ).then( response => response.data );
    },
    addSession( session, workshopId ) {
        const sessionCopy = { ...session, workshopId: parseInt( workshopId ) };
        sessionCopy.sequenceId = parseInt( sessionCopy.sequenceId );
        sessionCopy.duration = parseFloat( sessionCopy.duration );
        session.upvoteCount = 0;

        return axios.post(
            `${this.apiBaseUrl}/sessions`,
            sessionCopy,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( response => response.data );
    }
}