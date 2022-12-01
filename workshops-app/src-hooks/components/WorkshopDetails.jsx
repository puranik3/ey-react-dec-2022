import React, { Component, lazy, Suspense } from 'react';
import { NavLink, Route } from 'react-router-dom';
import Alert from './utils/Alert';
// import SessionsList from './SessionsList';
// import AddSession from './AddSession'
import Moment from 'react-moment';
import WorkshopsService from '../services/workshops.js';
import SessionsService from '../services/sessions.js';

const SessionsList = React.lazy(() => import( './SessionsList' ) );
const AddSession = React.lazy(() => import( './AddSession' ) );

const FETCHING_WORKSHOP_DETAILS = 'FETCHING_WORKSHOP_DETAILS';
const FETCHED_WORKSHOP_DETAILS = 'FETCHED_WORKSHOP_DETAILS';
const ERROR_FETCHING_WORKSHOP_DETAILS = 'ERROR_FETCHING_WORKSHOP_DETAILS';

class WorkshopDetails extends Component {
    state = {};

    onVoteChange = ( idx, updatedSession ) => {
        this.setState(
            curState => ({
                workshop: {
                    ...curState.workshop,
                    sessions: [
                        ...curState.workshop.sessions.slice( 0, idx ),
                        updatedSession,
                        ...curState.workshop.sessions.slice( idx + 1 )
                    ]
                }
            })
        )
    }

    upvote = ( idx ) => {
        return SessionsService
                    .upvote( this.state.workshop.sessions[idx].id )
                    .then( updatedSession => this.onVoteChange( idx, updatedSession ) )
                    .catch( error => alert( `Something went wrong while registering the vote (${error.message})` ) );
    }
    
    downvote = ( idx ) => {
        return SessionsService
                    .downvote( this.state.workshop.sessions[idx].id )
                    .then( updatedSession => this.onVoteChange( idx, updatedSession ) )
                    .catch( error => alert( `Something went wrong while registering the vote (${error.message})` ) );
    }
    
    render() {
        const { status, workshop, error } = this.state;

        let el = null;

        switch( status ) {
            case FETCHING_WORKSHOP_DETAILS:
                el = <Alert theme="primary" message="We are fetching details of the workshop. Hang on!" />;
                break;
            case FETCHED_WORKSHOP_DETAILS:
                el = (
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
                                            <i className={`fa ${workshop.modes.online ? 'fa-check' : 'fa-times'}`}></i>
                                            <small>Online</small>
                                        </p>
                                        <p>
                                            <i className={`fa ${workshop.modes.inPerson ? 'fa-check' : 'fa-times'}`}></i>
                                            <small>In person</small>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12" dangerouslySetInnerHTML={{__html: workshop.description}}></div>
                                </div>
                            </div>
                        </div>

                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" to={this.props.match.url} activeClassName="active" exact={true}>Sessions</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to={`${this.props.match.url}/add`} activeClassName="active" exact={true}>Add a session</NavLink>
                            </li>
                        </ul>

                        <Suspense fallback={<div>Loading...</div>}>
                            <Route exact path={this.props.match.path} render={ routeProps => (
                                <SessionsList sessions={workshop.sessions} upvote={this.upvote} downvote={this.downvote} {...routeProps} />
                            )} />
                            <Route path={`${this.props.match.path}/add`} component={AddSession} />
                        </Suspense>
                    </div>
                );
                break;
            case ERROR_FETCHING_WORKSHOP_DETAILS:
                el = <Alert theme="danger" message={error.message} />;
                break;
            default:
                el = null;
        }

        return el;
    }

    async componentDidMount() {
        this.setState({
            status: FETCHING_WORKSHOP_DETAILS
        });

        try {
            const id = this.props.match.params.id;
            const workshop = await WorkshopsService.getWorkshopById( id, true );
            this.setState({
                status: FETCHED_WORKSHOP_DETAILS,
                workshop
            });
        } catch( error ) {
            this.setState({
                status: ERROR_FETCHING_WORKSHOP_DETAILS,
                error
            });
        }
    }
}

export default WorkshopDetails;