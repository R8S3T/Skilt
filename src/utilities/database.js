import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

export async function initializeDatabase(dbAsset) {
    try {
        // Check if the SQLite database already exists
        const fileInfo = await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/skilt.db');

        if (!fileInfo.exists) {
            // Check and create the SQLite directory if not exists
            if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
                await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
            }

            // Log asset resolution
            const asset = Asset.fromModule(dbAsset);
            console.log("Asset URI:", asset.uri);

            // Download the database
            const downloadResult = await FileSystem.downloadAsync(
                asset.uri,
                FileSystem.documentDirectory + 'SQLite/skilt.db'
            );
            console.log("Download Result:", downloadResult);
        } else {
            console.log("Database already exists, skipping download.");
        }

    } catch (error) {
        console.error("Error in openDatabase:", error);
        throw error;
    }
}

export function getDatabase() {
    return SQLite.openDatabase('skilt.db');
}


