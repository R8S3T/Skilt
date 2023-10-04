import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { openDatabase } from "../utililities/database";
import { Button } from 'react-native';

const dbAsset = require('../../assets/skilt.db');

const Chapters = ({ route, navigation }) => {
    const { chapterId } = route.params;
    const [chapter, setChapter] = useState(null);

    const [subchapters, setSubchapters] = useState([]);

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

            tx.executeSql(
                'SELECT SubchapterName, SubchapterId FROM Subchapters WHERE ChapterId = ?',
                [chapterId],
                (_, {rows: { _array }}) => {
                    setSubchapters(_array);
                },
                (_, error) => {
                    console.error(`Error fetching subchapters for chapter ${chapterId}:`, error);
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
            <FlatList
                data={subchapters}
                keyExtractor={(item) => item.SubchapterId.toString()}
                renderItem={({ item }) => (
                    <Text style={styles.subchapterTitle}
                    onPress={() => navigation.navigate('SubchapterDetail', { subchapterId: item.SubchapterId })}>
                        {item.SubchapterName}
                    </Text>
                )}
                />
            <Button title='Start' onPress={() => navigation.navigate('Subchapters', { chapterId })} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subchapterTitle: {
        fontSize: 18,
        color: 'blue',
        textDecorationLine: 'underline',
        marginVertical: 5,
    }
})
export default Chapters;
