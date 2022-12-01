import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const WorkshopsListItem = ( { workshop } ) => {
    return (
        <Card style={{ width: '100%' }} className="p-3">
            <Card.Img variant="top" src={workshop.imageUrl} />
            <Card.Body>
                <Card.Title>{workshop.name}</Card.Title>
                <Card.Text dangerouslySetInnerHTML={{ __html : workshop.description }}>
                </Card.Text>
                <Button variant="primary" as={Link} to={`/workshops/${workshop.id}`}>View details</Button>
            </Card.Body>
        </Card>
    );
};

export default WorkshopsListItem;