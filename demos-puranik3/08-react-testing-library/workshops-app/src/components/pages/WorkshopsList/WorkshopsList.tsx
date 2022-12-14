import { useState, useEffect } from "react";
import { getWorkshops } from "../../../services/workshops";
import { Row, Col } from "react-bootstrap";
import useFetchData from "../../../hooks/useFetchData";
import WorkshopsListItem from "./WorkshopsListItem/WorkshopsListItem";
import IWorkshop from "../../../models/IWorkshop";

import './WorkshopsList.css';

const WorkshopsList = () => {
    const [_page, setPage] = useState(1);

    const {
        data : workshops,
        loading,
        error
    } = useFetchData( () => getWorkshops(_page), [ _page ] )

    const previous = () => {
        if (_page <= 1) {
            return;
        }

        setPage((p) => p - 1);
    };

    const next = () => {
        // If we go beyond the last page, the backend returns an empty array of workshops
        if (workshops?.length === 0) {
            return;
        }

        setPage((p) => p + 1);
    };

    // Feature 2: client-side filtering
    const [filterKey, setFilterKey] = useState("");
    const [filteredWorkshops, setFilteredWorkshops] = useState<IWorkshop[]>([]);

    useEffect(() => {
        if( !workshops ) {
            return;
        }

        setFilteredWorkshops(
            filterKey === ""
                ? workshops
                : workshops.filter((w) =>
                      w.name.toLowerCase().includes(filterKey.toLowerCase())
                  )
        );
    }, [filterKey, workshops]);

    return (
        <div className="container my-4">
            <h1>List of workshops</h1>
            <hr />
            <div className="my-2">
                <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={previous}
                >
                    Previous
                </button>
                <button className="btn btn-primary btn-sm" onClick={next}>
                    Next
                </button>
            </div>
            {filteredWorkshops.length !== 0 && (
                <div className="my-2">You are on page {_page}</div>
            )}
            <input
                type="search"
                className="form-control my-2"
                placeholder="Type to filter by name"
                onChange={(event) => setFilterKey(event.target.value)}
            />

            {loading && (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" data-testid="loading-spinner">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}
            {!loading && error && (
                <div className="alert alert-danger" data-testid="error-message">{error.message}</div>
            )}
            {!loading && !error && workshops?.length === 0 && (
                <div className="alert alert-info">That's all folks!</div>
            )}
            {!loading && !error && workshops?.length !== 0 && (
                <>
                    <Row xs={1} lg={3}>
                        {filteredWorkshops.map((workshop) => (
                            <Col key={workshop.id} className="d-flex my-3">
                                <WorkshopsListItem {...workshop} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </div>
    );
};

export default WorkshopsList;
