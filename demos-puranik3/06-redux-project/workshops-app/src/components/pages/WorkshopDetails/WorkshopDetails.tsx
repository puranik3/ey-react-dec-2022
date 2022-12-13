import { useState, useEffect } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SessionsList from './SessionsList/SessionsList';
import AddSession from './AddSession/AddSession';
import IWorkshop from '../../../models/IWorkshop';
import { State } from '../../../store';
import {
    loading as loadingThunk
} from '../../../actions/creators';

type Params = {
    id: string
}

const WorkshopDetails = () => {
    const { id } = useParams<Params>(); // { id: '2' }

    const dispatch = useDispatch();

    const {
        workshop,
        loading,
        error
    } = useSelector<State, State["wd"]>( state => state.wd )

    useEffect(
        () => {
            // we are dispatch a "function action".
            // Thunk
                // - will keep quiet if action is a normal object
                // - will execute the function if action is a function
            dispatch( loadingThunk( id ) as any );
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