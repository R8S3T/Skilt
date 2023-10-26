import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from 'react-native';
import Swiper from "react-native-swiper";
import useSubchapterData from "../utilities/useSubchapterData";
import QuizScreen from "./Quizzes/QuizScreen";

const Subchapters = ({ route }) => {
    console.log('Subchapters Component Rendered');
    const chapterId = useMemo(() => route.params.chapterId, [route.params.chapterId]);

    const { data: contentData, error } = useSubchapterData(chapterId);
    const [currentSlideType, setCurrentSlideType] = useState(null);
    const swiperRef = useRef(null);

    useEffect(() => {
        console.log('Subchapters is re-rendering due to change in route.params:', route.params);
    }, [route.params]); // Dependency array

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
            ref={swiperRef}
            loop={false}
            index={0} // Set initial slide to the first slide
            activeDotColor='blue'
            dotColor='gray'
            onIndexChanged={(index) => {
                setCurrentSlideType(combinedData[index].type);
            }}
            scrollEnabled={currentSlideType !== 'quiz'}
            // By removing style from Swiper, the inidcator dots are working correctly again
            // style={styles.wrapper}
        >
            {combinedData.map((item) => {
                const key = `${item.type}-${item.data.scContentId}`;
                console.log(key)
                return (
                    <View key={key} style={styles.slide}>
                        {item.type === 'content' &&
                        <Text>{item.data.ContentData}</Text>}
                        {item.type === 'quiz' && <QuizScreen contentId={item.data.scContentId} onContinue={() => swiperRef.current.scrollBy(1)} />}
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