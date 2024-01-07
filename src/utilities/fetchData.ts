import { getDatabase } from "./database";

export const fetchData = async <T>(query: string, params: any[]): Promise<T[]> => {
    console.log("Fetching data with params:", params);
    const db = getDatabase();
    return new Promise<T[]>((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                query,
                params,
                (_, { rows: { _array } }) => {
                    resolve(_array as T[]);
                },
                (_, err) => {
                    reject(err);
                    return false;
                }
            );
        });
    });
};

export const saveUserName = async (name: string) => {
    const query = 'INSERT INTO User (Name) VALUES (?)';
    try {
        await fetchData(query, [name]);
        console.log('Name saved:', name);
    } catch (error) {
        console.error('Error saving name:', error);
        throw error;
    }
};