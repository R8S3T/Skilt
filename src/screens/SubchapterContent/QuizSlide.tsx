import React from 'react';
import { View, StyleSheet } from 'react-native';
import QuizScreen from "../Quizzes/QuizScreen";

interface QuizSlideProps {
    quizData: {
        scContentId: number;
    };
    onContinue: () => void;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ quizData, onContinue }) => {
    return (
        <View style={styles.slide}>
            <QuizScreen
                contentId={quizData.scContentId}
                onContinue={onContinue}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});

export default QuizSlide;