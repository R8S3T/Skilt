import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { usePageSelectionHandler } from "./usePageSelectionHandler";
import { LearnStackParamList } from "../../components/LearnStackNavigator";
import { useSubchapter } from "../SubchaptersScreen/SubchapterContext";
import { useNavigation } from "@react-navigation/native";

import PagerView from 'react-native-pager-view';
import useSubchapterData from "../../utilities/useSubchapterData";
import ContentSlide from "./ContentSlide";
import QuizSlide from "../Quizzes/QuizSlide";
import NextButton from "./NextButton";


interface CombinedDataItem {
    type: 'content' | 'quiz';
    data: any;
}

interface SubchapterContentData {
    QuizId?: number;
    scContentId: number;
}

type SubchapterContentProps = {
    route: RouteProp<LearnStackParamList, 'SubchapterContent'>;
};

const SubchapterContent: React.FC<SubchapterContentProps> = ({ route }) => {
    const chapterId = route.params.chapterId;
    const nextSubchapterId = chapterId + 1;
    const { hideTabs } = route.params;
    const { data: contentData, error } = useSubchapterData(chapterId);
    const pagerViewRef = useRef<PagerView>(null);
    const navigation = useNavigation();

    const combinedData = useMemo(() => contentData.reduce((acc: CombinedDataItem[], curr: SubchapterContentData) => {
        acc.push({ type: 'content', data: curr });

        if (curr.QuizId && curr.scContentId) {
            acc.push({ type: 'quiz', data: curr });
        }
        return acc;
    }, []), [contentData]);

    const { currentIndex, handlePageSelected, currentSlideType, isQuizSlide } = usePageSelectionHandler(combinedData);

    if (error) {
        return <Text>Error fetching data.</Text>;
    }

    const { unlockSubchapter, markSubchapterAsFinished } = useSubchapter();

    const goToNextPage = () => {
        if (currentIndex < combinedData.length - 1) {
            const nextPage = currentIndex + 1;
            pagerViewRef.current?.setPage(nextPage);
        } else {
            unlockSubchapter(nextSubchapterId);
            markSubchapterAsFinished(chapterId);
            navigation.goBack();
        }
    };

    // Ensure that darker backgroundcolor only applies to quiz
    const getContentContainerStyle = (itemType: 'content' | 'quiz') => {
        return [
            styles.slideContent,
            itemType === 'quiz' ? styles.quizBackground : null,
        ];
    };

    return (
        <PagerView
            ref={pagerViewRef}
            style={styles.viewPager}
            initialPage={0}
            scrollEnabled={currentSlideType !== 'quiz'}
            onPageSelected={handlePageSelected}
        >
            {combinedData.map((item, index) => (
                <ScrollView
                    key={`${item.type}-${item.data.scContentId}`}
                    style={styles.scrollView}
                    contentContainerStyle={getContentContainerStyle(item.type)}
                >
                    {item.type === 'content' && <ContentSlide contentData={item.data} />}
                    {item.type === 'quiz' && <QuizSlide quizData={item.data} onContinue={goToNextPage} />}

                    {hideTabs && item.type !== 'quiz' && (
                        <NextButton
                            onPress={goToNextPage}
                            isActive={true}
                        />
                    )}
                </ScrollView>
            ))}
        </PagerView>
    );
};

const styles = StyleSheet.create({
    viewPager: {
        flex: 1,
    },
    scrollView: {
        flexGrow: 1,
        backgroundColor: 'transparent',
    },
    slideContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    quizBackground: {
        backgroundColor: '#2b4353',
    },
});

export default SubchapterContent;
