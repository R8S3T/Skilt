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

export const saveUserName = async (name) => {
    const query = 'INSERT INTO User (Name) VALUES (?)';
    try {
        await fetchData(query, [name]);
        console.log('Name saved:', name);
    } catch (error) {
        console.error('Error saving name:', error);
        throw error;
    }
};