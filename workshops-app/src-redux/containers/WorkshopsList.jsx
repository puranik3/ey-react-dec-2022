import { connect } from 'react-redux';
import WorkshopsList from '../components/WorkshopsList';
import { getWorkshopsForCurrentPage } from '../reducers/workshops';
import {
    fetchWorkshops,
    toggleDescriptionsAC,
    setPageWorkshopsListAC
} from '../actions/creators';

function mapStateToProps( state ) {
    return {
        ...state.ui.WorkshopsList,
        workshops: getWorkshopsForCurrentPage( state ),
        total: state.workshops.length,
        currentPage: state.workshops.currentPage
    };
}

function mapDispatchToProps( dispatch ) {
    return {
        toggleDescriptions() {
            dispatch( toggleDescriptionsAC() );
        },
        onPageChange( { currentPage } ) {
            console.log( 'container onPageChange' );
            dispatch( setPageWorkshopsListAC( { currentPage } ) )
        },
        fetchWorkshops( currentPage, pageSize ) {
            dispatch( fetchWorkshops( currentPage, pageSize ) );
        }
    };
}

export default connect( mapStateToProps, mapDispatchToProps )( WorkshopsList );