import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import useSubchapterData from "../utilities/useSubchapterData";
import QuizScreen from "./Quizzes/QuizScreen";

const Subchapters = ({ route }) => {
    const chapterId = useMemo(() => route.params.chapterId, [route.params.chapterId]);
    const { data: contentData, error } = useSubchapterData(chapterId);
    const [currentSlideType, setCurrentSlideType] = useState(null);
    const pagerViewRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const combinedData = useMemo(() => contentData.reduce((acc, curr) => {
        acc.push({ type: 'content', data: curr });

        if (curr.QuizId && curr.scContentId) {
            acc.push({ type: 'quiz', data: curr });
        }

        return acc;
    }, []), [contentData]);

    if (error) {
        return <Text>Error fetching data.</Text>
    }

    return (
        <PagerView
            ref={pagerViewRef}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={e => {
                const index = e.nativeEvent.position;
                setCurrentIndex(index);
                setCurrentSlideType(combinedData[index].type);
            }}
        >
            {(combinedData || []).map((item, index) => {
                const key = `${item.type}-${item.data.scContentId}`;
                return (
                    <View key={key} style={styles.slide}>
                        {item.type === 'content' && <Text>{item.data.ContentData}</Text>}
                        {item.type === 'quiz' && <QuizScreen contentId={item.data.scContentId}
                        onContinue={() => {
                            const nextPage = index + 1;
                            pagerViewRef.current && pagerViewRef.current.setPage(nextPage);
                        }}
                        />}
                    </View>
                );
            })}
        </PagerView>
    );
};

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    }
});

export default Subchapters;
