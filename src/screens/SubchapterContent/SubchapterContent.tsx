import React, { useState, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import useSubchapterData from "../../utilities/useSubchapterData";
import QuizScreen from "../Quizzes/QuizScreen";
import ContentWithExplanations from "../../components/ContentWithExplanations";
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

    return (
        <PagerView
            ref={pagerViewRef}
            style={styles.viewPager}
            initialPage={0}
            onPageSelected={e => {
                const index = e.nativeEvent.position;
                if (combinedData.length > index && combinedData[index]) {
                setCurrentIndex(index);
                setCurrentSlideType(combinedData[index].type);
                } else {
                console.error('Data at this index is not available:', index);
                }
            }}
        >
            {(combinedData || []).map((item, index) => {
                const key = `${item.type}-${item.data.scContentId}`;
                return (
                    <View key={key} style={styles.slide}>
                        {item.type === 'content' && <ContentSlide contentData={item.data} />}
                        {item.type === 'quiz' && (
                            <QuizSlide
                                quizData={item.data}
                                onContinue={() => {
                                    const nextPage = index + 1;
                                    pagerViewRef.current && pagerViewRef.current.setPage(nextPage);
                                }}
                            />
                        )}
                        <NextButton onPress={goToNextPage} />
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
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    nextButton: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    nextButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SubchapterContent;