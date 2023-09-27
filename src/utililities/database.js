import * as SQLite from 'expo-sqlite';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

async function openDatabase(dbAsset) {
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

            // Try to download the database and log any information or errors
            const downloadResult = await FileSystem.downloadAsync(
                asset.uri,
                FileSystem.documentDirectory + 'SQLite/skilt.db'
            );
            console.log("Download Result:", downloadResult);
        } else {
            console.log("Database already exists, skipping download.");
        }

        // Open the SQLite database
        return SQLite.openDatabase('skilt.db');
    } catch (error) {
        console.error("Error in openDatabase:", error);
        throw error;  // If you want the error to propagate to the calling function
    }
}

export { openDatabase };


