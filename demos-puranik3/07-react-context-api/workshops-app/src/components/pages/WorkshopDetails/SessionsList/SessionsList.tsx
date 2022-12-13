import { useState, useEffect, useCallback } from 'react';
import { ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SessionsListItem from './SessionsListItem/SessionsListItem';
import { getSessionForWorkshopWithId, vote as voteSvc, VoteType } from '../../../../services/sessions';
import ISession from '../../../../models/ISession';
import { toast } from 'react-toastify';

type Props = {
    id: string | number
};

const SessionsList = ( { id } : Props ) => {
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchSessions = useCallback(async () => {
        setLoading(true);

        try {
            const sessions = await getSessionForWorkshopWithId( id );
            setSessions(sessions);
        } catch (error) {
            setError(error as Error);
        }

        setLoading(false);
    }, [ id ]);

    useEffect(
        () => {
            fetchSessions();
        },
        [ fetchSessions ] // on load only (fetchSessions will not change, but we can include it as a good practice)
    );

    const vote = useCallback(async ( sessionId: number, voteType : VoteType ) => {
        try {
            const updatedSession = await voteSvc( sessionId, voteType );

            // approach #1: if you want to update only the one user voted on
            // setSessions(
            //     curSessions => {
            //         // we go through the current sessions, and create a new array where every item except the one we voted on remains the same. The voted session is replaced with the updated details.
            //         return curSessions.map( s => s.id !== sessionId ? s : updatedSession )
            //     }
            // );

            // approach #2: if you want to update ALL the sessions
            fetchSessions();
            
            toast.success( `Your vote for session ${updatedSession.name} is registered` );
        } catch( error ) {
            toast.error( ( error as Error ).message );
        }
    }, [ fetchSessions ]);

    return (
        <div className="mt-5">
            <h2 className="d-flex align-items-center justify-content-between">
                <span>List of Sessions</span>
                <Link to={`/workshops/${id}/add`}>
                    <Button variant="primary">Add a session</Button>
                </Link>
            </h2>
            <hr />
            {loading && (
                <div className="d-flex justify-content-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                     </Spinner>
                </div>
            )}
            {!loading && error && (
                <Alert variant="danger">{error.message}</Alert>
            )}
            {!loading && !error && sessions.length !== 0 && (
                <>
                    <ListGroup>
                        {sessions.map((session) => (
                           <SessionsListItem
                                key={session.id}
                                session={session}
                                vote={vote}
                            />
                        ))}
                    </ListGroup>
                </>
            )}
        </div>
    );
}
 
export default SessionsList;