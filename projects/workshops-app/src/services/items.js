const items = [];

for( let i = 1; i <= 1e6; i++ ) {
    items.push({
        id: i,
        name: 'ITEM ' + i
    });
}

const search = ( key ) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const results = [];

            for( let i = 0; i < items.length; i++ ) {
                if( items[i].name.includes( key ) ) {
                    results.push( items[i] );
                }

                if( results.length === 5 ) {
                    break;
                }
            }

            resolve( results );
        }, Math.floor( Math.random() * 5000 ) );
    });
};

export {
    search
};