import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { getDatabase } from "../utilities/database";

const dbAsset = require('../../assets/skilt.db');

const Chapters = ({ route, navigation }) => {
    const { chapterId } = route.params;
    console.log("route.params in Chapters:", route.params);
    const [chapter, setChapter] = useState(null);

    const [subchapters, setSubchapters] = useState([]);

    const fetchData = async () => {
        const db = getDatabase(dbAsset);

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT ChapterName, ChapterIntro FROM Chapters WHERE ChapterId = ?',
                [chapterId],
                (_, result) => {
                    if (result && result.rows && result.rows._array && result.rows._array.length > 0) {
                        setChapter(result.rows._array[0]);
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
                    <TouchableOpacity
                        style={styles.subchapterButton}
                        onPress={() => navigation.navigate('Subchapters', { chapterId: item.SubchapterId })}
                    >
                    <Text style={styles.subchapterTitle}>
                        {item.SubchapterName}
                    </Text>
                    </TouchableOpacity>
                )}
                />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    subchapterButton: {
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
        /* alignItems: 'center', */
        justifyContent: 'center',
    },
    subchapterTitle: {
        fontSize: 15,
        color: 'black',
    }
})
export default Chapters;
