import axios from 'axios';

export const addSession = async ( id, session ) => {
    const sessionUpdated = {
        ...session,
        sequenceId: parseInt( session.sequenceId ),
        duration: parseFloat( session.duration ),
        workshopId: id
    };

    try {
        const response = await axios.post(
            `http://workshops-server.herokuapp.com/sessions`,
            sessionUpdated,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch( error ) {
        throw error;
    }
}