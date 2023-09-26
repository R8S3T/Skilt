import React, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
import { openDatabase } from "../utililities/database";

const dbAsset = require('../../assets/skilt.db');

const Chapters = ({ route }) => {
    const { chapterId } = route.params;
    const [chapter, setChapter] = useState(null);

    const fetchData = async () => {
        const db = await openDatabase(dbAsset);

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT ChapterName, ChapterIntro FROM Chapters WHERE ChapterId = ?',
                [chapterId],
                (_, {rows: { _array } }) => {
                    if (_array.length > 0) {
                        setChapter(_array[0]);
                    }
                },
                (_, error) => {
                    console.error(`Error fetching data for chapter ${chapterId}:`, error);
                }
            );
        });
    };

    useEffect(() => {
        fetchData();
    }, [chapterId]);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
            <Text>This is the detail page for Chapter {chapterId}</Text>
            {chapter && (
                <>
                    <Text>{chapter.ChapterName}</Text>
                    <Text>{chapter.ChapterIntro}</Text>
                </>
            )}
        </View>
    );
};

export default Chapters;
