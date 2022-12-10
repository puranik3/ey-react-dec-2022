import { ListGroupItem, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { vote as voteSvc, VoteType } from '../../../../../services/sessions';
import ISession from '../../../../../models/ISession';

const SessionsListItem = ( {
    id,
    name,
    speaker,
    level,
    duration,
    abstract,
    upvoteCount
} : ISession ) => {
    const vote = async ( voteType : VoteType ) => {
        try {
            const updatedSession = await voteSvc( id, voteType );
            alert( `Your vote for session ${name} is registered` );
        } catch( error ) {
            alert( ( error as Error ).message );
        }
    };

    return (
        <ListGroupItem>
            <Row className="align-items-stretch">
                <Col xs={1} className="d-flex flex-column align-items-center justify-content-center">
                    <FontAwesomeIcon
                        icon={faCaretUp}
                        className="fa-2x"
                        onClick={() => vote( 'upvote' )}
                    />
                    {upvoteCount}
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        className="fa-2x"
                        onClick={() => vote( 'downvote' )}
                    />
                </Col>
                <Col xs={11}>
                    <h3>{name}</h3>
                    <div className="my-2">by <strong>{speaker}</strong></div>
                    <div className="my-2">{level}</div>
                    <div className="my-2">{duration} hours</div>
                    <div className="my-2">{abstract}</div>
                </Col>
            </Row>
        </ListGroupItem>
    );
}
 
export default SessionsListItem;