import React, { Component, Suspense, lazy } from 'react';
import { getWorkshopWithSessionsById } from '../services/workshops';

import { Switch, Link, Route } from 'react-router-dom';
import Moment from 'react-moment';
import SessionsList from './SessionsList';

// import AddSession from './AddSession';
const AddSession = lazy( () => import( './AddSession' ) );

export default class WorkshopDetails extends Component {
    static FETCHING_WORKSHOP_DETAILS = 'FETCHING_WORKSHOP_DETAILS';
    static FETCHED_WORKSHOP_DETAILS = 'FETCHED_WORKSHOP_DETAILS';
    static ERROR_FETCHING_WORKSHOP_DETAILS = 'ERROR_FETCHING_WORKSHOP_DEATILS';

    state = {
        status: ''
    };

    render() {
        let el = null;
        const { status, workshop, error } = this.state;

        switch( status ) {
            case WorkshopDetails.FETCHING_WORKSHOP_DETAILS:
                el = (
                    <div className="alert alert-primary alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>Fetching workshop details..Hang on!</strong>
                    </div>
                );
                break;
            case WorkshopDetails.FETCHED_WORKSHOP_DETAILS:
                el = (
                    <>
                        <div>
                            <h2>
                                {workshop.name}
                            </h2>
                            <hr />
                            <div className="row my-4">
                                <div className="col-4">
                                    <img className="img-fluid" src={workshop.imageUrl} alt={workshop.description} />
                                </div>
                                <div className="col-8">
                                    <div className="row">
                                        <div className="col-3">
                                            <p>
                                                <small>
                                                    <Moment interval={0} format="MMM D YYYY">
                                                        {workshop.startDate}
                                                    </Moment>
                                                    {" - "}
                                                    <Moment interval={0} format="MMM D YYYY">
                                                        {workshop.endDate}
                                                    </Moment>
                                                </small>
                                            </p>
                                            <p>
                                                <small className="text-muted">
                                                    {workshop.time}
                                                </small>
                                            </p>
                                        </div>
                                        <div className="col-3">
                                            <p>
                                                <small>Online</small>
                                            </p>
                                            <p>
                                                <small>In person</small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12" dangerouslySetInnerHTML={{__html: workshop.description}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <>
                            <Link to={this.props.match.url}>Sessions</Link>
                            <Link to={`${this.props.match.url}/add`}>Add a new session</Link>
                        </>
                        <Switch>
                            <Suspense fallback={<div>Loading the form...Please wait..</div>}>
                                <Route path={`${this.props.match.path}/add`} component={AddSession} />
                                <Route path={this.props.match.path} render={() => <SessionsList sessions={workshop.sessions} />} />
                            </Suspense>
                        </Switch>
                    </>
                );
                break;
            case WorkshopDetails.ERROR_FETCHING_WORKSHOP_DETAILS:
                el = (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span className="sr-only">Close</span>
                        </button>
                        <strong>{error.message}</strong>
                    </div>
                );
                break;
        }

        return el;
    }

    async componentDidMount() {
        const { id } = this.props.match.params;

        this.setState({
            status: WorkshopDetails.FETCHING_WORKSHOP_DETAILS
        });

        try {
            const workshop = await getWorkshopWithSessionsById( id );
            this.setState({
                status: WorkshopDetails.FETCHED_WORKSHOP_DETAILS,
                workshop
            });
        } catch( error ) {
            this.setState({
                status: WorkshopDetails.ERROR_FETCHING_WORKSHOP_DETAILS,
                error
            })
        }
    }
}
