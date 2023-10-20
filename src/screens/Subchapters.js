import React, { useState, useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Swiper from "react-native-swiper";
import useSubchapterData from "../utilities/useSubchapterData";
import QuizScreen from "./Quizzes/QuizScreen";

const Subchapters = ({ route }) => {
    console.log('Subchapters Component Rendered');
    const chapterId = useMemo(() => route.params.chapterId, [route.params.chapterId]);

    const { data: contentData, error } = useSubchapterData(1);

    useEffect(() => {
        console.log('Subchapters is re-rendering due to change in route.params:', route.params);
    }, [route.params]); // Dependency array

    // Additional debug for data fetching
    useEffect(() => {
        console.log('Subchapters is re-rendering due to change in contentData or error:', { contentData, error });
    }, [contentData, error]);

    console.log('Fetched contentData:', contentData);
    console.log('First contentData:', contentData[0]);



    const combinedData = useMemo(() => contentData.reduce((acc, curr) => {
        acc.push({ type: 'content', data: curr });

        if (curr.QuizId && curr.scContentId) {
            acc.push({ type: 'quiz', data: curr });
        }

        return acc;
    }, []), [contentData]);


    console.log('Combined data:', combinedData);

    if (error) {
        return <Text>Error fetching data.</Text>
    }

    return (
        <Swiper 
        index={0} // Set initial slide to the first slide
        onIndexChanged={(index) => console.log(index)}
        activeDotColor='blue'
        dotColor='gray'
        style={styles.wrapper}
        >
            {combinedData.map((item, index) => {
                const key = `${item.type}-${item.data.scContentId}`;
                return (
                    <View key={key} style={styles.slide}>
                        {item.type === 'content' &&
                        <Text>{item.data.ContentData}</Text>}
                        {item.type === 'quiz' && <QuizScreen contentId={item.data.scContentId} />}
                    </View>
                );
            })}
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