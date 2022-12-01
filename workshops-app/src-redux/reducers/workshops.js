import { FETCHED_WORKSHOPS, SET_PAGE_WORKSHOPS_LIST } from '../actions/constants';

const initialState = {
    length: 0,
    currentPage: 1,
    currentWorkshops: []
};

export default function( curState = initialState, action ) {
    let newState;

    switch( action.type ) {
        case FETCHED_WORKSHOPS:
            newState = { ...curState, length: action.payload.total };
            newState.currentWorkshops = action.payload.workshops;
            action.payload.workshops.forEach(workshop => {
                newState[workshop.id] = workshop;
            });
            break;
        case SET_PAGE_WORKSHOPS_LIST:
            newState = {
                ...curState,
                currentPage: action.payload.currentPage
            };
            break;
        default:
            newState = curState;
    }

    return newState;
}

export function getWorkshopsForCurrentPage( state ) {
    return state.workshops.currentWorkshops;
}