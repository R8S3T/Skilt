import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { openDatabase } from "../utililities/database";
import Swiper from "react-native-swiper";

const dbAsset = require('../../assets/skilt.db');

const Subchapters = ({ route }) => {
    const { chapterId } = route.params;
    const [subchapters, setSubchapters] = useState([]);

    const fetchData = async () => {
        const db = await openDatabase(dbAsset);

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT SubchapterName, SubchapterContent FROM Subchapters WHERE ChapterId = ?',
                [chapterId],
                (_, {rows: { _array} }) => {
                    setSubchapters(_array);
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
        <Swiper style={styles.wrapper}>
            {subchapters.map((subchapter, index) => (
                <View key={index} style={styles.slide} >
                    <Text>{subchapter.SubchapterName}</Text>
                    <Text>{subchapter.SubchapterContent}</Text>
                </View>
            ))}
        </Swiper>
    );
};

const styles = StyleSheet.create({
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});

export default Subchapters;