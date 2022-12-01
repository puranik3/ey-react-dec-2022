import { call, takeLatest, put, delay } from "redux-saga/effects";
import { fetchedItems } from '../actions/creators';
import { SEARCH_ITEMS } from '../actions/constants';
import { search } from '../services/items';

function * searchItemsSagaWorker( action ) {
    yield delay( 500 ); // wait for 500 ms before calling the API
    const items = yield call( search, action.payload.value );
    yield put( fetchedItems( items ) );
}

function * searchItemsSaga() {
    yield takeLatest( SEARCH_ITEMS, searchItemsSagaWorker );
}

export default searchItemsSaga;