import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
const range = ( from, to, step = 1 ) => {
    let i = from;
    const range = [];

    while (i <= to) {
        range.push(i);
        i += step;
    }

    return range;
};

class Pagination extends Component {
    static propTypes = {
        pageSize: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        numPaginationItems: PropTypes.number.isRequired,
        onPageChange: PropTypes.func.isRequired,
        className: PropTypes.string
    };

    static defaultProps = {
        pageSize: 10,
        onPageChange: () => {},
    };

    state = {
        currentPage: 1,
    };

    derivedPaginationData() {
        const { pageSize, total } = this.props;
        return {
            firstPage: Math.min(1, total / pageSize),
            lastPage: total === 0 ? -1 : Math.ceil( total / pageSize )
        };
    }

    getPaginationData() {
        const { pageSize, total, numPaginationItems } = this.props;
        const { currentPage } = this.state;
        const { firstPage, lastPage } = this.derivedPaginationData();

        const firstPaginationItem = Math.max(
            Math.floor( ( currentPage - 1 ) / numPaginationItems) * numPaginationItems + 1,
            firstPage
        );
        const lastPaginationItem = Math.min(
            firstPaginationItem + numPaginationItems - 1,
            lastPage
        );
        
        return {
            hasPrevious: firstPaginationItem > firstPage,
            hasNext: lastPaginationItem < lastPage,
            paginationItems: range( firstPaginationItem, lastPaginationItem ),
            currentPageFirst: Math.max( 0, ( currentPage - 1 ) * pageSize + 1 ),
            currentPageLast: Math.min( total, currentPage * pageSize ),
            total
        };
    }

    onPageChange = () => {
        console.log( 'Pagination onPageChange' );
        this.props.onPageChange({
            currentPage: this.state.currentPage
        });
    }

    gotoPrevious = ( event ) => {
        event.preventDefault();
                
        this.setState(
            ( { currentPage } ) => this.getPaginationData().hasPrevious ? { currentPage: currentPage - 1 } : {},
            this.onPageChange
        );
    }

    gotoPage = ( event, page ) => {
        event.preventDefault();
        this.setState(
            { currentPage: page },
            this.onPageChange
        );
    }

    gotoNext = ( event ) => {
        event.preventDefault();

        this.setState(
            ( { currentPage } ) => this.getPaginationData().hasNext ? { currentPage: currentPage + 1 } : {},
            this.onPageChange
        );
    }

    render() {
        const { hasPrevious, hasNext, paginationItems, currentPageFirst, currentPageLast, total } = this.getPaginationData();
        const { currentPage } = this.state;
        const { className } = this.props;

        console.log( this.getPaginationData() );

        return (
            <div className={className}>
                <ul className="pagination pagination-sm my-0">
                    {
                        hasPrevious && (
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={this.gotoPrevious}>
                                    Previous
                                </a>
                            </li>
                        )
                    }
                    {
                        paginationItems.map(page => (
                            <li className={`page-item${page === currentPage ? ' active': ''}`} key={page}>
                                <a className="page-link" href="#" onClick={event => this.gotoPage( event, page )}>
                                    {page}
                                </a>
                            </li>
                        ))
                    }
                    {
                        hasNext && (
                            <li className="page-item">
                                <a className="page-link" href="#" onClick={this.gotoNext}>
                                    Next
                                </a>
                            </li>
                        )
                    }
                </ul>
                <small className="text-muted">Showing {currentPageFirst} - {currentPageLast} of {total}</small>
            </div>
        );
    }

    componentDidMount() {
        this.gotoPage( { preventDefault: () => {} }, this.state.currentPage );
    }
}

export default Pagination;
