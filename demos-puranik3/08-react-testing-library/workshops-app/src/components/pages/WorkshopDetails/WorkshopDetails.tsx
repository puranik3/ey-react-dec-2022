import { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Route, useParams } from 'react-router-dom';
import SessionsList from './SessionsList/SessionsList';
import AddSession from './AddSession/AddSession';
import {
    getWorkshopById
} from '../../../services/workshops';
import IWorkshop from '../../../models/IWorkshop';

type Params = {
    id: string
}

const WorkshopDetails = () => {
    const { id } = useParams<Params>(); // { id: '2' }

    const [workshop, setWorkshop] = useState<IWorkshop | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(
        () => {
            const helper = async () => {
                setLoading(true);

                try {
                    const workshop = await getWorkshopById( id );
                    setWorkshop(workshop as any);
                } catch (error) {
                    setError(error as Error);
                }

                setLoading(false);
            };

            helper();
        },
        [] // on page load
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
            {!loading && !error && workshop && (
                <Row>
                    <Col xs={12}>
                        <h1>{workshop.name}</h1>
                    </Col>
                    <Col xs={12} lg={4}>
                        <Image
                            src={workshop.imageUrl}
                            fluid
                        />
                    </Col>
                    <Col xs={12} lg={8}>
                        <div dangerouslySetInnerHTML={{ __html: workshop.description }}></div>
                    </Col>
                </Row>
            )}

            <Route path="/workshops/:id" exact>
                <SessionsList id={id} />
            </Route>
            <Route path="/workshops/:id/add">
                <AddSession id={id} />
            </Route>
        </div>
    );
}
 
export default WorkshopDetails;