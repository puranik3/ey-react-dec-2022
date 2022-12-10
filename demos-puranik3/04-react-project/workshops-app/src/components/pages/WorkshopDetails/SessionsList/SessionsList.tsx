import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
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
        [] // on load only
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
                    <Row xs={1} lg={3}>
                        {sessions.map((session) => (
                            <Col key={session.id} className="d-flex my-3">
                                {session.name}
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
}
 
export default SessionsList;