import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import {
    fetchingWorkshops,
    nextPage as nextPageAC
} from '../../actions/creators';
import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS
} from '../../actions/constants';
import WorkshopsListItem from './WorkshopsListItem';

const WorkshopsList = () => {
    const dispatch = useDispatch();
    const {
        status,
        workshops,
        error,
        page
    } = useSelector( state => state.workshops );

    const nextPage = () => {
        dispatch( nextPageAC() );
    }
    useEffect(() => {
        // // because we have included thunk middleware, we can dispatch a function (and the thunk middleware shall execute that function)
        // dispatch( fetchWorkshopsThunk() );
        dispatch( fetchingWorkshops( page ) );
    }, [ page, dispatch ]);

    return (
        <div>
            {
                status ===  FETCHING_WORKSHOPS && (
                    'Workshops are being fetched'
                )
            }
            {
                status === FETCHED_WORKSHOPS && (
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
                status === ERROR_FETCHING_WORKSHOPS && (
                    <div>{error.message}</div>
                )
            }
        </div>
    );
};

export default WorkshopsList;