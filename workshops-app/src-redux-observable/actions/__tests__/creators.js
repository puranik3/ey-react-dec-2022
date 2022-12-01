import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import WorkshopsService from '../../services/workshops';
jest.mock( '../../services/workshops' );

import { fetchWorkshops } from '../creators';
import { FETCHING_WORKSHOPS, FETCHED_WORKSHOPS } from '../constants';

const middleware = [ thunk ];
const mockStore = configureMockStore( middleware );

describe( 'fetchWorkshops', () => {
    const mockResponse = {
        workshops: [
            { name: 'Angular' },
            { name: 'React' }
        ],
        total: 12
    };

    it( 'fetches workshops of right page and number of results', () => {
        WorkshopsService.getWorkshopsByPage.mockResolvedValue( mockResponse );

        const expectedActions = [
            { type: FETCHING_WORKSHOPS },
            {
                type: FETCHED_WORKSHOPS, 
                payload: {
                    workshops: mockResponse.workshops,
                    total: mockResponse.total
                }
            }
        ];

        const store = mockStore({
            workshops: {
                length: 0,
                currentPage: 1,
                currentWorkshops: []
            },
            ui: {
                WorkshopsList: {
                    showDescriptions: true,
                    status: '',
                    error: null
                }
            }
        });

        return store.dispatch( fetchWorkshops( 1, 2 ) )
                    .then(() => {
                        console.log( store.getActions() );
                        expect( store.getActions() ).toEqual( expectedActions );
                        expect( WorkshopsService.getWorkshopsByPage ).toHaveBeenCalled();
                    });
    });
});