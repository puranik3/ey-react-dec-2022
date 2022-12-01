import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Alert from './utils/Alert';
import Pagination from './utils/Pagination';
import Moment from 'react-moment';
import WorkshopsService from '../services/workshops.js';

import './WorkshopsList.css';

const FETCHING_WORKSHOPS = 'FETCHING_WORKSHOPS';
const FETCHED_WORKSHOPS = 'FETCHED_WORKSHOPS';
const ERROR_FETCHING_WORKSHOPS = 'ERROR_FETCHING_WORKSHOPS';

function WorkshopsList( props ) {
    const [ showDescriptions, setShowDescriptions ] = useState( true );
    const [ paginationData, setPaginationData ] = useState({
        total: 0,
        currentPage: 1
    });

    const pageSize = useRef( 2 );
    const numPaginationItems = useRef( 2 );

    const toggleDescriptions = () => setShowDescriptions( showDescriptions => !showDescriptions );

    const onPageChange = ( { currentPage } ) => setPaginationData( 
        paginationData => ({
            ...paginationData,
            currentPage
        })
    );

    const getPaginationData = () => ({
        ...paginationData,
        pageSize: pageSize.current,
        numPaginationItems: numPaginationItems.current,
        onPageChange: onPageChange
    });

    const [ { status, workshops, error }, setState ] = React.useState({});
    
    useEffect(() => {
        if( paginationData.currentPage ) {
            const fetchWorkshops = async () => {
                setState({
                    status: FETCHING_WORKSHOPS
                });

                try {
                    const data = getPaginationData();
                    const { workshops, total } = await WorkshopsService.getWorkshopsByPage( data.currentPage, data.pageSize );
                    setState({
                        status: FETCHED_WORKSHOPS,
                        workshops,
                    });
                    setPaginationData({
                        total
                    });
                } catch( error ) {
                    setState({
                        status: ERROR_FETCHING_WORKSHOPS,
                        error
                    });
                }
            }

            fetchWorkshops();
        }
    }, [ paginationData.currentPage ] );

    // async componentDidMount() {
    //     this.fetchWorkshops();
    // }

    // async componentDidUpdate( oldProps, oldState ) {
    //     if( oldState.currentPage !== this.state.currentPage ) {
    //         this.fetchWorkshops();
    //     }
    // }

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
                        <button className="btn btn-sm btn-primary" onClick={toggleDescriptions}>
                            { showDescriptions ? 'Hide details' : 'Show details' }
                        </button>
                    </div>
                </h1>
            </div>
            <hr />
            <div className="col-12 clearfix">
                <Pagination {...getPaginationData()} className="float-right mb-2" />
            </div>
            {el}
        </div>
    );
}

export default WorkshopsList;