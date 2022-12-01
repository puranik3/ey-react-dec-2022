import { useState, useEffect, lazy, Suspense } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams, Link, Route } from 'react-router-dom';
import Moment from 'react-moment';
import { getWorkshopById } from '../../services/workshops';
import SessionsList from './SessionsList';

const AddSession = lazy(() => import( './AddSession' ));

const WorkshopDetails = () => {
    const [ status, setStatus ] = useState( 'FETCHING' );
    const [ workshop, setWorkshop ] = useState( {} );
    const [ error, setError ] = useState( null );

    const { id } = useParams();

    const fetchWorkshop = async () => {
       setStatus( 'FETCHING' );

        try {
            const workshop = await getWorkshopById( id );
            setWorkshop( workshop );
            setStatus( 'FETCHED' );
        } catch( error ) {
            setError( error );
            setStatus( 'ERROR' );
        }
    };

    useEffect(() => {
        fetchWorkshop();
    }, []);

    return (
        <div>
            {
                status === 'FETCHING' && (
                    'Workshop details are being fetched'
                )
            }
            {
                status === 'FETCHED' && (
                    <div>
                        <Row className="my-4">
                            <Col xs={12} md={4}>
                                <img src={workshop.imageUrl} className="img-fluid" alt={workshop.name} />
                            </Col>
                            <Col xs={12} md={8}>
                                <h2>{workshop.name}</h2>
                                <div dangerouslySetInnerHTML={{ __html : workshop.description }}></div>
                                <div>
                                    <small>
                                        <Moment format="ddd MMM DD yyyy">{workshop.startDate}</Moment>
                                        {" - "}
                                        <Moment format="ddd MMM DD yyyy">{workshop.endDate}</Moment>
                                    </small>
                                </div>
                                <div>
                                    <small>{workshop.time}</small>
                                </div>
                                <div className="mt-3">
                                    {workshop.location.address}, {workshop.location.city}, {workshop.location.state}
                                </div>
                            </Col>
                        </Row>
                        
                        <Link to={`/workshops/${id}`}>
                            List of session
                        </Link>
                        {" "}
                        <Link to={`/workshops/${id}/add`}>
                            Add a session
                        </Link>
                        
                        <Route path="/workshops/:id" exact>
                            <SessionsList />
                        </Route>
                        <Route path="/workshops/:id/add" exact>
                            <Suspense fallback={<div>Wait a moment while we load</div>}>
                                <AddSession />
                            </Suspense>
                        </Route>
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

export default WorkshopDetails;