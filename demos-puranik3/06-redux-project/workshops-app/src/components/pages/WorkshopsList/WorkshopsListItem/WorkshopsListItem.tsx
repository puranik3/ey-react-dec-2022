import { Link } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import Moment from 'react-moment';
import IWorkshop from "../../../../models/IWorkshop";

import './WorkshopsListItem.css';

const WorkshopsListItem = ({
    id,
    imageUrl,
    name,
    startDate,
    endDate
} : IWorkshop ) => {
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
                <Link to={'/workshops/' + id}>
                    <Button variant="primary">Know more</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default WorkshopsListItem;
