import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import useSubchapterData from "../../utilities/useSubchapterData";
import ContentSlide from "./ContentSlide";
import QuizSlide from "./QuizSlide";
import NextButton from "./NextButton";


interface CombinedDataItem {
    type: 'content' | 'quiz';
    data: any;
}

interface SubchapterContentData {
    QuizId?: number;
    scContentId: number;
}

type SubchapterContentRouteParams = {
    route: RouteProp<{ params: { chapterId: number } }, 'params'>;
};

const SubchapterContent = ({ route }: SubchapterContentRouteParams) => {
    const chapterId = route.params.chapterId;
    const { data: contentData, error } = useSubchapterData(chapterId);
    const [currentSlideType, setCurrentSlideType] = useState<'content' | 'quiz' | null>(null);
    const pagerViewRef = useRef<PagerView>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const combinedData = useMemo(() => contentData.reduce((acc: CombinedDataItem[], curr: SubchapterContentData) => {
        acc.push({ type: 'content', data: curr });

        if (curr.QuizId && curr.scContentId) {
            acc.push({ type: 'quiz', data: curr });
        }

        return acc;
    }, []), [contentData]);

    useEffect(() => {
        if (error) {
            console.error(error);
            // Handle the error - maybe set some state to show in the UI
        }
    }, [error]);

    if (error) {
        return <Text>Error fetching data.</Text>
    }

    const goToNextPage = () => {
        if (currentIndex < combinedData.length - 1) {
            const nextPage = currentIndex + 1;
            pagerViewRef.current?.setPage(nextPage);
        }
    };

    // Update the currentSlideType based on the initial slide
    useEffect(() => {
        if (combinedData.length > 0) {
            setCurrentSlideType(combinedData[0].type);
        }
    }, [combinedData]);

        // Function to handle page selection
        const handlePageSelected = e => {
            const index = e.nativeEvent.position;
            if (combinedData.length > index && combinedData[index]) {
                setCurrentIndex(index);
                setCurrentSlideType(combinedData[index].type);
            } else {
                console.error('Data at this index is not available:', index);
            }
        };

        // Enable or disable swiping based on slide type
        const isSwipeEnabled = currentSlideType !== 'quiz';

    return (
        <PagerView
            ref={pagerViewRef}
            style={styles.viewPager}
            initialPage={0}
            scrollEnabled={isSwipeEnabled}
            onPageSelected={handlePageSelected}
        >
            {(combinedData || []).map((item, index) => {
                const key = `${item.type}-${item.data.scContentId}`;
                return (
                    <ScrollView
                        key={key}
                        style={styles.scrollView} // Apply flex style here
                        contentContainerStyle={styles.slideContent} // Apply content layout styles here
                    >
                        {item.type === 'content' && <ContentSlide contentData={item.data} />}
                        {item.type === 'quiz' && <QuizSlide quizData={item.data} onContinue={goToNextPage} />}
                        <NextButton onPress={goToNextPage} />
                    </ScrollView>
                );
            })}
        </PagerView>
    );
};

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    slideContent: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default SubchapterContent;