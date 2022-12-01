import { useState, useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { getWorkshops } from '../../services/workshops';
import WorkshopsListItem from './WorkshopsListItem';

const WorkshopsList = () => {
    const [ status, setStatus ] = useState( 'FETCHING' );
    const [ workshops, setWorkshops ] = useState( [] );
    const [ error, setError ] = useState( null );
    const [ page, setPage ] = useState( 1 );

    const nextPage = () => {
        setPage( p => p + 1 );
    }

    const fetchWorkshops = async () => {
       setStatus( 'FETCHING' );

        try {
            const workshops = await getWorkshops( page );
            setWorkshops( workshops );
            setStatus( 'FETCHED' );
        } catch( error ) {
            setError( error );
            setStatus( 'ERROR' );
        }
    };

    useEffect(() => {
        fetchWorkshops();
    }, [ page ]);

    return (
        <div>
            {
                status === 'FETCHING' && (
                    'Workshops are being fetched'
                )
            }
            {
                status === 'FETCHED' && (
                    <div>
                        Number of workshops = {workshops.length}
                        <br />
                        Page = {page}
                        <br />
                        <Button onClick={nextPage} variant="primary">Next page</Button>
                        <Row xs={1} md={2} lg={3} className="my-4">
                            {
                                workshops.map(
                                    workshop => {
                                        return (
                                            <Col key={workshop.id} className="d-flex align-items-stretch my-3">
                                                <WorkshopsListItem workshop={workshop} />
                                            </Col>
                                        );
                                    }
                                )
                            }
                        </Row>
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

export default WorkshopsList;