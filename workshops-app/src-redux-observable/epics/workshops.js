import WorkshopsService from '../services/workshops';
import { fetchedWorkshopsAC, errorFetchingWorkshopsAC } from '../actions/creators';

import { ofType } from 'redux-observable';
import { map, mergeMap, catchError } from 'rxjs/operators';

import {
    FETCHING_WORKSHOPS,
    FETCHED_WORKSHOPS,
    ERROR_FETCHING_WORKSHOPS,
    TOGGLE_DESCRIPTIONS,
    SET_PAGE_WORKSHOPS_LIST
} from '../actions/constants';

export default function workshopsEpic( action$, state$ ) {
    return action$.pipe(
        ofType( FETCHING_WORKSHOPS ),
        mergeMap( ( { payload : { currentPage: page, pageSize: limit } } ) => {
            return WorkshopsService.getWorkshopsByPage( page, limit ).pipe(
                map( fetchedWorkshopsAC ),
                catchError( errorFetchingWorkshopsAC )
            );
        })
    );
}