const userNameTable = async (db) => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT
        );
    `;
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                createTableQuery,
                [],
                () => {
                    console.log("User table created successfully.");
                    resolve();
                },
                (_, error) => {
                    console.error("Error creating User table:", error);
                    reject(error);
                }
            );
        });
    });
};

export default userNameTable;