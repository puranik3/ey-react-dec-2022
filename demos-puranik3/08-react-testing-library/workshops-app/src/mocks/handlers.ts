import { rest } from 'msw';
import workshops from './data/workshops';

const { REACT_APP_API_BASE_URL } = process.env;

// configure successful responses
const handlers = [
    rest.get( `${REACT_APP_API_BASE_URL}/workshops`, ( req, res, ctx ) => {
        return res(
            ctx.json( workshops )
        );
    })
];

// configure failure responses
const errorHandlers = [
    'To be done'
];

export {
    handlers,
    errorHandlers
};