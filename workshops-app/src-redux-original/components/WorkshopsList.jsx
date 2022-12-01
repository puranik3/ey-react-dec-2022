import React from 'react';
import { Link } from 'react-router-dom';
import Alert from './utils/Alert';
import Pagination from './utils/Pagination';
import Moment from 'react-moment';

import './WorkshopsList.css';

import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS
} from '../actions/constants';

class WorkshopsList extends React.Component {
    pageSize = 2;
    numPaginationItems = 2;

    getPaginationData() {
        const { total, currentPage, onPageChange } = this.props;
        return {
            total,
            currentPage,
            pageSize : this.pageSize,
            numPaginationItems: this.numPaginationItems,
            onPageChange
        };
    }

    render() {
        const { workshops, status, error, showDescriptions, toggleDescriptions } = this.props;

        let el = null;

        switch( status ) {
            case FETCHING_WORKSHOPS:
                el = <Alert theme="primary" message="We are fetching list of workshops. Hang on!" />;
                break;
            case FETCHED_WORKSHOPS:
                console.log( '***' );
                
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
                            <button className="btn btn-sm btn-primary" onClick={toggleDescriptions}>
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

    componentDidMount() {
        this.props.fetchWorkshops( this.props.currentPage, this.pageSize );
    }

    componentDidUpdate( oldProps, oldState ) {
        if( oldProps.currentPage !== this.props.currentPage ) {
            this.props.fetchWorkshops( this.props.currentPage, this.pageSize );
        }
    }
}

export default WorkshopsList;