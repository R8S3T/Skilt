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
                tx.executeSql(
                    query,
                    params,
                    (_, { rows: { _array} }) => {
                        if (!isEqual(data, _array)) {
                            setData(_array);
                        }
                    },
                    (_, err) => {
                        console.log(err);
                        if (error != err) {
                            setError(err);
                        }
                    }
                );
            });
        };

        fetchData();
    }, [query, params]);

    return { data, error };
};

export default useFetchData;