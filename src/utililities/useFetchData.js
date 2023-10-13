import { useState, useEffect } from "react";
import { openDatabase } from "../utililities/database";

const dbAsset = require('../../assets/skilt.db');

const deepEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const useFetchData = (query, params) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const db = await openDatabase(dbAsset);

            db.transaction((tx) => {
                tx.executeSql(
                    query,
                    params,
                    (_, { rows: { _array} }) => {
                        console.log('Fetched data: ', _array);
                        if (!deepEqual(data, _array)) {
                            setData(_array);
                        }
                    },
                    (_, err) => {
                        console.error('Error fetching data:', err);
                        setError(err);
                    }
                );
            });
        };

        console.log('Fetching Data with query: ', query);
        console.log('And params: ', params);

        fetchData();
    }, [query, params, data]);

    return { data, error };
};

export default useFetchData;