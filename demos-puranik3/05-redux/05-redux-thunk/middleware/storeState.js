const storeState = store => next => action => {
    console.log( 'storeState is called (part 1)' );
    
    next( action ); // this passes control to the store (which calls the reducer)
    
    console.log( 'storeState is called (part 2)' );
    
    localStorage.setItem( 'state', JSON.stringify( store.getState() ) );
};

export default storeState;