import { rest } from 'msw';
import workshops from './data/workshops';

const { REACT_APP_API_BASE_URL } = process.env;

// configure successful responses
const handlers = [
    rest.get( `${REACT_APP_API_BASE_URL}/workshops`, ( req, res, ctx ) => {
        const _page = req.url.searchParams.get( '_page' );
        
        if( _page === '1' ) {
            return res(
                ctx.status( 200 ),
                ctx.json( workshops.slice( 0, 10 ) )
            );
        }

        if( _page === '2' ) {
            return res(
                ctx.status( 200 ),
                ctx.json( workshops.slice( 10, 20 ) )
            );
        } else {
            return res(
                ctx.status( 200 ),
                ctx.json( workshops )
            );
        }
    })
];

// configure failure responses
const errorHandlers = [
    rest.get( `${REACT_APP_API_BASE_URL}/workshops`, ( req, res, ctx ) => {
        return res(
            ctx.status( 500 )
        );
    })
];

export {
    handlers,
    errorHandlers
};