import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import useFetchData from "../../utilities/useFetchData";
import MultipleChoice from '../Quizzes/MultipleChoice';
import FillInTheBlanks from '../Quizzes/FillInTheBlanks';

interface QuizSlideProps {
    quizData: {
        scContentId: number;
    };
    onContinue: () => void;
}

interface QuizData {
    Type: string;
}

const QuizSlide: React.FC<QuizSlideProps> = ({ quizData, onContinue }) => {
    console.log("Quiz Data in QuizSlide:", quizData);
    const query = 'SELECT * FROM Quiz WHERE ContentId =?';
    
    const { data, error } = useFetchData<QuizData[]>(query, [quizData.scContentId]);

    if (error) {
        return <Text>Error loading quiz.</Text>;
    }

    if (data.length === 0) {
        return <Text>No quiz found for this content.</Text>;
    }

    const quiz = data[0];

    if (!quiz) {
        return <Text>Quiz data is not available.</Text>;
    }

    return (
        <View style={styles.slide}>
            {quiz.Type === 'multiple_choice' ? (
                <MultipleChoice quiz={quiz} onContinue={onContinue} />
            ) : quiz.Type === 'fill_in_the_blanks' ? (
                <FillInTheBlanks quiz={quiz} onContinue={onContinue} />
            ) : (
                <Text>Unsupported quiz type.</Text>
            )}
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
