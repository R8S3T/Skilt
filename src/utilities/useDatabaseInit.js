import { useState, useEffect } from "react";
import { initializeDatabase } from "./database";

const useDatabaseInitialization = (dbAsset) => {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const initialize = async () => {
            try {
                await initializeDatabase(dbAsset);
                setIsInitialized(true);
            } catch (error) {
                console.error('Database initialization error: ', error);
            }
        };

        initialize();
    }, [dbAsset]);

    return isInitialized;
};

export default useDatabaseInitialization;