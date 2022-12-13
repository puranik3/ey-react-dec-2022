const logger = store => next => action => {
    console.log( 'logger is called (part 1)' );
    console.log( action );
    console.log( store.getState() );

    next( action ); // passing on control to the next middleware (storeState)

    console.log( 'logger is called (part 2)' );

    // called after the state changes
    console.log( action );
    console.log( store.getState() );
};

export default logger;