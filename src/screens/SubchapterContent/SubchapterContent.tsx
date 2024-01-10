import React, { useMemo, useRef, useState } from "react";
import { Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';
import useSubchapterData from "../../utilities/useSubchapterData";
import ContentSlide from "./ContentSlide";
import QuizSlide from "./QuizSlide";
import NextButton from "./NextButton";
import { usePageSelectionHandler } from "./usePageSelectionHandler";
import { LearnStackParamList } from "../../components/LearnStackNavigator";

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
    const { data: contentData, error } = useSubchapterData(chapterId);
    const pagerViewRef = useRef<PagerView>(null);

    const combinedData = useMemo(() => contentData.reduce((acc: CombinedDataItem[], curr: SubchapterContentData) => {
        acc.push({ type: 'content', data: curr });

        if (curr.QuizId && curr.scContentId) {
            acc.push({ type: 'quiz', data: curr });
        }
        return acc;
    }, []), [contentData]);

    const { currentIndex, handlePageSelected, currentSlideType } = usePageSelectionHandler(combinedData);

    if (error) {
        return <Text>Error fetching data.</Text>;
    }

    const goToNextPage = () => {
        if (currentIndex < combinedData.length - 1) {
            const nextPage = currentIndex + 1;
            pagerViewRef.current?.setPage(nextPage);
        }
    };

    const [isNextButtonActive, setIsNextButtonActive] = useState(true); // State to manage NextButton's active state

    const handleAnswerSubmit = (isCorrect: boolean) => {
        setIsNextButtonActive(isCorrect);
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
                    contentContainerStyle={styles.slideContent}
                >
                    {item.type === 'content' && <ContentSlide contentData={item.data} />}
                    {item.type === 'quiz' && (
                        <QuizSlide
                            quizData={item.data}
                            onContinue={goToNextPage}
                            onAnswerSubmit={handleAnswerSubmit}
                        />
                    )}
                    <NextButton onPress={goToNextPage} isActive={isNextButtonActive} />
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
        flex: 1,
    },
    slideContent: {
/*         flex: 1, */
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default SubchapterContent;
