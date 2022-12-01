import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from './utils/Alert';
import Pagination from './utils/Pagination';
import Moment from 'react-moment';
import WorkshopsService from '../services/workshops.js';

import './WorkshopsList.css';

const FETCHING_WORKSHOPS = 'FETCHING_WORKSHOPS';
const FETCHED_WORKSHOPS = 'FETCHED_WORKSHOPS';
const ERROR_FETCHING_WORKSHOPS = 'ERROR_FETCHING_WORKSHOPS';

class WorkshopsList extends Component {
    state = {
        showDescriptions: true,
        total: 0,
        currentPage: 1
    };

    pageSize = 2;
    numPaginationItems = 2;

    toggleDescriptions = () => {
        this.setState(
            curState => ({
                showDescriptions: !curState.showDescriptions
            })
        );
    }

    onPageChange = ( { currentPage } ) => {
        this.setState( { currentPage } );
    }

    getPaginationData() {
        return {
            total: this.state.total,
            currentPage: this.state.currentPage,
            pageSize: this.pageSize,
            numPaginationItems: this.numPaginationItems,
            onPageChange: this.onPageChange
        };
    }

    render() {
        const { status, workshops, error, showDescriptions } = this.state;

        let el = null;

        switch( status ) {
            case FETCHING_WORKSHOPS:
                el = <Alert theme="primary" message="We are fetching list of workshops. Hang on!" />;
                break;
            case FETCHED_WORKSHOPS:
                el = (
                    <div className="row">
                        {
                            workshops.map(workshop => (
                                <div className="col-4 d-flex" key={workshop.id}>
                                    <Link to={`/workshops/${workshop.id}`} className="text-reset text-decoration-none w-100 my-3 d-flex flex-column">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-img-container d-flex flex-column justify-content-center">
                                                    <img className="card-img-top w-50 d-block mx-auto" src={workshop.imageUrl} alt={workshop.description} />
                                                </div>
                                                <h4 className="card-title">{workshop.name}</h4>
                                                <div className="card-text">
                                                    <div>
                                                        <Moment interval={0} format="MMM D YYYY">
                                                            {workshop.startDate}
                                                        </Moment>
                                                        {" - "}
                                                        <Moment interval={0} format="MMM D YYYY">
                                                            {workshop.endDate}
                                                        </Moment>
                                                    </div>
                                                    <div>
                                                        <span>{workshop.time}</span>
                                                    </div>
                                                    {
                                                        showDescriptions && (
                                                            <div className="my-3" dangerouslySetInnerHTML={{__html: workshop.description}}></div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                );
                break;
            case ERROR_FETCHING_WORKSHOPS:
                el = <Alert theme="danger" message={error.message} />;
                break;
            default:
                el = null;
        }

        return (
            <div>
                <div className="clearfix">
                    <h1>
                        Workshops
                        <div className="float-right">
                            <button className="btn btn-sm btn-primary" onClick={this.toggleDescriptions}>
                                { showDescriptions ? 'Hide details' : 'Show details' }
                            </button>
                        </div>
                    </h1>
                </div>
                <hr />
                <div className="col-12 clearfix">
                    <Pagination {...this.getPaginationData()} className="float-right mb-2" />
                </div>
                {el}
            </div>
        );
    }

    async fetchWorkshops() {
        this.setState({
            status: FETCHING_WORKSHOPS
        });

        try {
            const data = this.getPaginationData();
            const { workshops, total } = await WorkshopsService.getWorkshopsByPage( data.currentPage, data.pageSize );
            this.setState({
                status: FETCHED_WORKSHOPS,
                workshops,
                total
            });
        } catch( error ) {
            this.setState({
                status: ERROR_FETCHING_WORKSHOPS,
                error
            });
        }
    }

    async componentDidMount() {
        this.fetchWorkshops();
    }

    async componentDidUpdate( oldProps, oldState ) {
        if( oldState.currentPage !== this.state.currentPage ) {
            this.fetchWorkshops();
        }
    }
}

export default WorkshopsList;