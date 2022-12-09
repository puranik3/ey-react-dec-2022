import { Card, Button } from "react-bootstrap";
import Moment from 'react-moment';

const WorkshopsListItem = ({
    imageUrl,
    name,
    startDate,
    endDate
} : any ) => {
    return (
        <Card className="w-100 p-4 workshop-list-item">
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    <Moment format="DD-mm-YYYY">{startDate}</Moment>
                    {" - "}
                    <Moment format="DD-mm-YYYY">{endDate}</Moment>
                </Card.Text>
                <Button variant="primary">Know more</Button>
            </Card.Body>
        </Card>
    );
};

export default WorkshopsListItem;