import React, { useEffect, useMemo, useRef, useState } from "react";
import { Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
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
    options?: string[];
}

type SubchapterContentProps = {
    route: RouteProp<LearnStackParamList, 'SubchapterContent'>;
};

const SubchapterContent: React.FC<SubchapterContentProps> = ({ route }) => {
    const chapterId = route.params.chapterId;
    const nextSubchapterId = chapterId + 1;
    const { hideTabs } = route.params;
    const { data: contentData, error, loading } = useSubchapterData(chapterId);
    const pagerViewRef = useRef<PagerView>(null);
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // If there's no data and no error, we are still loading
        if (!contentData && !error) {
            setIsLoading(true);
        } else {
            // If we have data or an error, loading is complete
            setIsLoading(false);
        }
    }, [contentData, error]);

    const combinedData = useMemo(() => {
        return contentData.reduce((acc: CombinedDataItem[], curr: any) => { // Notice 'any' type is used here
            acc.push({ type: 'content', data: curr });

            // Check if the 'options' property exists and is an array with elements
            if (curr.QuizId && Array.isArray(curr.options) && curr.options.length > 0) {
                acc.push({ type: 'quiz', data: curr });
            }

            return acc;
        }, []);
    }, [contentData]);

    const { currentIndex, handlePageSelected, currentSlideType, isQuizSlide } = 
    usePageSelectionHandler(combinedData);

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

    if (loading) {
        // While we're loading, show a spinner or similar loading indicator
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        // If we've stopped loading and there's an error, show an error message
        return <Text>Error fetching data.</Text>;
    }

    if (combinedData.length === 0) {
        // If we've stopped loading and combinedData is empty, show a 'no content' message
        return <Text>No content available.</Text>;
    }
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
