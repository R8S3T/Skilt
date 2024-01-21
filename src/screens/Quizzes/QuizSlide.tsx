import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchData from "../../utilities/useFetchData";
import MultipleChoice from './MultipleChoice';
import ClozeTest from './ClozeTest/ClozeTest';

interface QuizSlideProps {
    quizData: {
        scContentId: number;
    };
    onContinue: () => void;
    onAnswerSubmit?: (isCorrect: boolean) => void;
}

interface QuizData {
    Type: string;
    QuizId: number;
    Question: string;
    Answer: string;
    options?: string[];
}

const QuizSlide: React.FC<QuizSlideProps> = ({ quizData, onContinue, onAnswerSubmit = () =>{} }) => {
    const query = 'SELECT * FROM Quiz WHERE ContentId =?';

    const { data, error } = useFetchData(query, [quizData.scContentId]);

    if (error) {
        return <Text>Error loading quiz.</Text>;
    }

    if (data.length === 0) {
        return <Text>No quiz found for this content.</Text>;
    }

    const quiz = data[0] as QuizData;

    if (!quiz) {
        return <Text>Quiz data is not available.</Text>;
    }

    // Prepare content based on quiz type
    let content;
    if (quiz.Type === 'multiple_choice') {
        content = (
            <MultipleChoice
                quiz={quiz}
                onContinue={onContinue}
                onAnswerSubmit={onAnswerSubmit}
            />
        );
    } else if (quiz.Type === 'cloze_test') {
        // Split the question and answers for cloze test
        const sentenceParts = quiz.Question.split("___");
        const correctAnswers = quiz.Answer.split(",");

        content = (
            <ClozeTest
                sentenceParts={sentenceParts}
                options={quiz.options || []}
                correctAnswers={correctAnswers}
            />
        );
    } else {
        content = <Text>Unsupported quiz type.</Text>;
    }

    return (
        <View style={styles.slide}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2b4353',
    },
});

export default QuizSlide;

