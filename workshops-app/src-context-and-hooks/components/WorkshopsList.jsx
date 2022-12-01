import React, { Component, useState, useEffect, useContext } from 'react';
import { getWorkshops } from '../services/workshops';
import WorkshopsContext from '../context/workshops';

import {
    fetchingWorkshopsAC,
    fetchedWorkshopsAC,
    errorFetchingWorkshopsAC
} from '../actions/creators';

import { Link } from 'react-router-dom';

WorkshopsList.FETCHING_WORKSHOPS = 'FETCHING_WORKSHOPS';
WorkshopsList.FETCHED_WORKSHOPS = 'FETCHED_WORKSHOPS';
WorkshopsList.ERROR_FETCHING_WORKSHOPS = 'ERROR_FETCHING_WORKSHOPS';

export default function WorkshopsList() {
    // const [ state, setState ] = useState({
    //     status: ''
    // });
    const value = useContext( WorkshopsContext );

    let el = null;
    const { workshops: { status, items: workshops, error }, dispatch } = value;

    useEffect(
        () => {
            async function fetchWorkshops() {
                dispatch( fetchingWorkshopsAC() );
                // setState({
                //     ...state,
                //     status: WorkshopsList.FETCHING_WORKSHOPS
                // });

                try {
                    const workshops = await getWorkshops();
                    dispatch( fetchedWorkshopsAC( workshops ) );
                    // setState({
                    //     ...state,
                    //     status: WorkshopsList.FETCHED_WORKSHOPS,
                    //     workshops
                    // });
                } catch( error ) {
                    dispatch( errorFetchingWorkshopsAC( error ) );
                    // setState({
                    //     ...state,
                    //     status: WorkshopsList.ERROR_FETCHING_WORKSHOPS,
                    //     error
                    // });
                }
            }

            fetchWorkshops();
        },
        [] // run effect ONLY after initial render (cdm)
    );

    console.log( status, workshops );

    switch( status ) {
        case WorkshopsList.FETCHING_WORKSHOPS:
            el = (
                <div className="alert alert-primary alert-dismissible fade show" role="alert">
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        <span className="sr-only">Close</span>
                    </button>
                    <strong>Fetching workshops..Hang on!</strong>
                </div>
            );
            break;
        case WorkshopsList.FETCHED_WORKSHOPS:
            el = (
                <div class="row">
                    {
                        workshops.map( workshop => (
                            <div class="col-4 d-flex">
                                <Link to={`/workshops/${workshop.id}`}>
                                    <div class="card w-100 my-3 d-flex flex-column">
                                        <div class="card-body">
                                            <div class="card-img-container d-flex flex-column justify-content-center">
                                                <img class="card-img-top w-50 d-block mx-auto" src={workshop.imageUrl} alt={workshop.description} />
                                            </div>
                                            <h4 class="card-title">{workshop.name}</h4>
                                            <div class="card-text">
                                                <div>
                                                    <span>{workshop.startDate}</span> - <span>{workshop.endDate}</span>
                                                </div>
                                                <div>
                                                    <span>{workshop.time}</span>
                                                </div>
                                                <div class="my-3" dangerouslySetInnerHTML={{ __html : workshop.description }}></div>
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
        case WorkshopsList.ERROR_FETCHING_WORKSHOPS:
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

    return (
        <>
            <h1>Workshops nearby...</h1>
            <hr />
            {el}
        </>
    );
}
