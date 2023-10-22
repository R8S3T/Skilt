import { useState, useEffect } from "react";
import { initializeDatabase, getDatabase } from "../utilities/database";
import { isEqual } from "lodash";


const dbAsset = require('../../assets/skilt.db');
initializeDatabase(dbAsset);

const useFetchData = (query, params) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            const db = getDatabase();

            db.transaction((tx) => {
                console.log('Executing query:', query);  // Log query
                console.log('With params:', params);  // Log params

                tx.executeSql(
                    query,
                    params,
                    (_, { rows: { _array} }) => {
                        console.log('Fetched data: ', _array);
                        if (!isEqual(data, _array)) {
                            console.log('Setting new data in useFetchData');
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
    }, [query, params]);

    return { data, error };
};

export default useFetchData;