import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { openDatabase } from "../utililities/database";
import { Button } from 'react-native';

const dbAsset = require('../../assets/skilt.db');

const Chapters = ({ route, navigation }) => {
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
        <View style={styles.container} >
            <Text>This is the detail page for Chapter {chapterId}</Text>
            {chapter && (
                <>
                    <Text>{chapter.ChapterName}</Text>
                    <Text>{chapter.ChapterIntro}</Text>
                </>
            )}
            <Button title='Start' onPress={() => navigation.navigate('Subchapters', { chapterId })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Chapters;
