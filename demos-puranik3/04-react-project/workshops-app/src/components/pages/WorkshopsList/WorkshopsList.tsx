import { useState, useEffect } from 'react';
import axios from 'axios';

const getWorkshops = async ( _page : number ) => {
    const response = await axios.get(
        `https://workshops-server.herokuapp.com/workshops`,
        {
            params: {
                // _page: _page
                _page
            }
        }
    );
    return response.data;
};

const WorkshopsList = () => {
    const [ workshops, setWorkshops ] = useState<any[]>( [] );
    const [ loading, setLoading ] = useState( true );
    const [ error, setError ] = useState<Error | null>( null );
    const [ _page, setPage ] = useState( 1 );

    // Feature 1: pagination (fetching workshops)
    useEffect(
        () => {
            const helper = async () => {
                setLoading( true );
                
                try {
                    const workshops = await getWorkshops( _page );
                    setWorkshops( workshops as any[] );
                } catch( error ) {
                    setError( error as Error );
                }

                setLoading( false );
            };

            helper();
        },
        [ _page ] // dependencies array
    );

    const previous = () => {
        if( _page <= 1 ) {
            return;
        };

        setPage( p => p - 1 );
    };
    
    const next = () => {
        // If we go beyond the last page, the backend returns an empty array of workshops
        if( workshops.length === 0 ) {
            return;
        }

        setPage( p => p + 1 );
    };
    
    // Feature 2: client-side filtering
    const [ filterKey, setFilterKey ] = useState( '' );
    const [ filteredWorkshops, setFilteredWorkshops ] = useState<any[]>( [] );
    
    useEffect(
        () => {
            setFilteredWorkshops( 
                filterKey === '' ? workshops : workshops.filter( w => w.name.toLowerCase().includes( filterKey.toLowerCase() ) )
            );
        },
        [ filterKey, workshops ]
    );

    return (
        <div className="container my-4">
            <h1>List of workshops</h1>
            <hr />
            <div className="my-2">
                <button className="btn btn-primary btn-sm me-2" onClick={previous}>Previous</button>
                <button className="btn btn-primary btn-sm" onClick={next}>Next</button>
            </div>
            {
                filteredWorkshops.length !== 0 && (
                    <div className="my-2">You are on page {_page}</div>
                )
            }
            <input
                type="search"
                className="form-control my-2"
                placeholder="Type to filter by name"
                onChange={( event ) => setFilterKey( event.target.value )}
            />
            
            {
                loading && (
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                )
            }
            {
                !loading && error && (
                    <div className="alert alert-danger">{error.message}</div>
                )
            }
            {
                !loading && !error && workshops.length === 0 && (
                    <div className="alert alert-info">That's all folks!</div>
                )
            }
            {
                !loading && !error && workshops.length !== 0 && (
                    <>
                        <div className="row">
                            {
                                filteredWorkshops.map(
                                    workshop => (
                                        <div className="col-12 col-lg-4" key={workshop.id}>
                                            {workshop.name}
                                        </div>
                                    )
                                )
                            }
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default WorkshopsList;