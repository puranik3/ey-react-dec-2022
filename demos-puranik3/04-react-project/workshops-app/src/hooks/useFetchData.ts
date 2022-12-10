import { useState, useEffect } from 'react';

const useFetchData = <T>( fetch : () => Promise<T>, dependencies : any[] = [] ) => {
    const [data, setData] = useState<T | null>( null );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchHelper = async () => {
        setLoading(true);

        try {
            const data = await fetch();
            setData( data );
        } catch (error) {
            setError(error as Error);
        }

        setLoading(false);
    };

    // Feature 1: pagination (fetching workshops)
    useEffect(
        () => {
            fetchHelper();
        },
        dependencies // dependencies array
    );

    return {
        data,
        loading,
        error,
        fetchHelper
    };
}

export default useFetchData;