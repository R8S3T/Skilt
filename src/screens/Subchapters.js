import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from 'react-native';
import { openDatabase } from "../utililities/database";
import Swiper from "react-native-swiper";
import useFetchData from "../utililities/useFetchData";

const Subchapters = ({ route }) => {
    console.log('Subchapters Component Rendered');
    const { chapterId } = route.params;
    const query = 'SELECT ContentData FROM SubchapterContent WHERE SubchapterId = ?';
    const params = [chapterId];

    const { data: contentData, error } = useFetchData(query, params);

    useEffect(() => {
        console.log('Subchapters is re-rendering due to change in route.params:', route.params);
    }, [route.params]); // Dependency array
    
    // Additional debug for data fetching
    useEffect(() => {
        console.log('Subchapters is re-rendering due to change in contentData or error:', { contentData, error });
    }, [contentData, error]);
    
    if (error) {
        return <Text>Errot fetching data.</Text>
    }

    return (
        <Swiper style={styles.wrapper}>
            {contentData.map((content, index) => (
                <View key={index} style={styles.slide} >
                    <Text>{content.ContentData}</Text>
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