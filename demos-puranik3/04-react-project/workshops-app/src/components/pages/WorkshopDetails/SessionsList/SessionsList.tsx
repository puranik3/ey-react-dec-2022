import { useState, useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import SessionsListItem from './SessionsListItem/SessionsListItem';
import { getSessionForWorkshopWithId } from '../../../../services/sessions';
import ISession from '../../../../models/ISession';

type Props = {
    id: string | number
};

const SessionsList = ( { id } : Props ) => {
    const [sessions, setSessions] = useState<ISession[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const sessions = await getSessionForWorkshopWithId( id );
                    setSessions(sessions);
                } catch (error) {
                    setError(error as Error);
                }

                setLoading(false);
            };

            helper();
        },
        [ id ] // on load only (id will not change, but we can include it as a good practice)
    );

    return (
        <div>
            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {!loading && error && (
                <div className="alert alert-danger">{error.message}</div>
            )}
            {!loading && !error && sessions.length !== 0 && (
                <>
                    <ListGroup>
                        {sessions.map((session) => (
                           <SessionsListItem {...session} key={session.id} />
                        ))}
                    </ListGroup>
                </>
            )}
        </div>
    );
}
 
export default SessionsList;