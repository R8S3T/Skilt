import { getDatabase } from "./database";

export const fetchData = async (query, params) => {
    const db = getDatabase();
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                query,
                params,
                (_, { rows: { _array } }) => {
                    resolve(_array);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
};