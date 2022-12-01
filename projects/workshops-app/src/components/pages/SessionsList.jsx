import { useState, useEffect } from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { getSessionsForWorkshop, putVote } from '../../services/sessions';
import { useParams } from 'react-router-dom';

const SessionsList = () => {
    const [ status, setStatus ] = useState( 'FETCHING' );
    const [ sessions, setSessions ] = useState( [] );
    const [ error, setError ] = useState( null );
    
    const { id } = useParams();

    const fetchSessions = async () => {
       setStatus( 'FETCHING' );

        try {
            const sessions = await getSessionsForWorkshop( id );
            setSessions( sessions );
            setStatus( 'FETCHED' );
        } catch( error ) {
            setError( error );
            setStatus( 'ERROR' );
        }
    };

    // on component mount...
    useEffect(() => {
        fetchSessions();
    }, []);

    const castVote = async ( session, voteType ) => {
        try {
            const updatedSession = await putVote( session.id, voteType );

            const newSessions = sessions.map( s => {
                if( s.id !== session.id ) {
                    return s;
                } else {
                    return updatedSession;
                }
            });

            setSessions( newSessions );
        } catch( error ) {
            alert( error.message )
        }
    };

    return (
        <div className="my-3">
            {
                status === 'FETCHING' && (
                    'Sessions are being fetched'
                )
            }
            {
                status === 'FETCHED' && (
                    <div>
                        <h3>Session for the workshop</h3>
                        <hr />
                        <ListGroup>
                            {
                                sessions.map(
                                    session => {
                                        return (
                                            <ListGroup.Item key={session.id}>
                                                <Row>
                                                    <Col xs={1} className="d-flex flex-column align-items-center">
                                                        <FontAwesomeIcon
                                                            icon={faCaretUp}
                                                            size="2x"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => castVote( session, 'upvote' )}
                                                        />

                                                        {session.upvoteCount}
                                                        
                                                        <FontAwesomeIcon
                                                            icon={faCaretDown}
                                                            size="2x"
                                                            style={{ cursor: 'pointer' }}
                                                            onClick={() => castVote( session, 'downvote' )}
                                                        />
                                                    </Col>
                                                    <Col xs={11}>
                                                        <div>{session.name}</div>
                                                        <div>{session.speaker}</div>
                                                        <div>{session.abstract}</div>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        );
                                    }
                                )
                            }
                        </ListGroup>
                    </div>
                )
            }
            {
                status === 'ERROR' && (
                    <div>{error.message}</div>
                )
            }
        </div>
    );
};

export default SessionsList;