import { takeEvery, call, put } from 'redux-saga/effects';
import { FETCHING_WORKSHOPS } from '../actions/constants';
import { getWorkshops } from '../services/workshops';
import { fetchedWorkshops, errorFetchingWorkshops } from '../actions/creators';

function * fetchWorkshopsSagaWorker( action ) {
    try {
        // @todo We should be passing the page number stored in the state. We are hard-coding 1 for now.
        const workshops = yield call( getWorkshops, action.payload.page );
        yield put( fetchedWorkshops( workshops ) );
    } catch( error ) {
        yield put( errorFetchingWorkshops( error ) );
    }
}

function * fetchWorkshopsSaga() {
    yield takeEvery( FETCHING_WORKSHOPS, fetchWorkshopsSagaWorker );
}

export default fetchWorkshopsSaga;