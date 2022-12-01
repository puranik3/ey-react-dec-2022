import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchItems } from '../../actions/creators';

const Home = () => {
    const [ search, setSearch ] = useState( '' );

    const dispatch = useDispatch();
    const items = useSelector( state => state.search.items );
    
    return (
        <div>
            <h1>Workshops App</h1>
            <hr />
            <p>
                Welcome to Workshops App. You can find details of tech workshops happening nearby.
            </p>
            <input
                type="search"
                value={search}
                onChange={
                    ( event ) => {
                        setSearch( event.target.value );
                        dispatch( searchItems( event.target.value ) );
                    }
                }
            />
            <h3>Suggestions for you...</h3>
            {
                items.map(
                    item => <div>{item.name}</div>
                )
            }
        </div>
    );
};

export default Home;