import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import userNameTable from './userNameTable';


export async function initializeDatabase(dbAsset) {
    try {
        // Check if the SQLite database already exists
        const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/skilt.db');
        
        if (!fileInfo.exists) {
            console.log("Database file does not exist, creating...");

            // Check and create the SQLite directory if not exists
            const dirInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite');
            if (!dirInfo.exists) {
                console.log("SQLite directory does not exist, creating...");
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
            } else {
                console.log("SQLite directory already exists.");
            }

            // Log asset resolution
            const asset = Asset.fromModule(dbAsset);
            console.log("Asset resolved for database creation.");

            // Download the database
            console.log("Downloading the database file...");
            const downloadResult = await FileSystem.downloadAsync(
                asset.uri,
                FileSystem.documentDirectory + 'SQLite/skilt.db'
            );
            console.log("Database file downloaded at:", downloadResult.uri);
        } else {
            console.log("Database file already exists. Path:", FileSystem.documentDirectory + 'SQLite/skilt.db');
        }

    } catch (error) {
        console.error("Error in database file check or creation:", error);
        throw error;
    }

    // Create the tables after ensuring the database exists
    try {
        const db = getDatabase();
        console.log("Opening the database:", db);
        await userNameTable(db);  // Call userNameTable with the database connection
    } catch (error) {
        console.error("Error during table creation:", error);
    }
}

export function getDatabase() {
    return SQLite.openDatabase('skilt.db');
}