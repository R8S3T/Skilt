import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Quiz } from "../../utilities/useFetchData";

interface QuizData {
    Question: string;

    Answer: string;
    options: string[];
}

type OptionType = string;

interface MultipleChoiceProps {
    quiz: Quiz;
    onContinue: () => void;
    onAnswerSubmit: (isCorrect: boolean) => void;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ quiz, onContinue, onAnswerSubmit }) => {

    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const handleAnswer = (option: OptionType) => {
        const correctAnswerSelected = quiz.Answer === option;
        setSelectedOption(option);
        setIsCorrect(correctAnswerSelected);
        onAnswerSubmit(correctAnswerSelected);
    };

    const getButtonStyle = (option: OptionType) => {
        let style = styles.button;
        if (selectedOption) {
            if (option === quiz.Answer) {
                style = { ...style, borderWidth: 3 };
            } else if (option === selectedOption) {
                style = { ...style, borderColor: 'darkred', borderWidth: 3 };
            }
        }
        return style;
    };

    return (
        <>
            <Text style={styles.quizText}>{quiz.Question}</Text>
            {quiz.options && quiz.options.map((option, index) => {
                const buttonStyle = getButtonStyle(option);

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleAnswer(option)}
                        style={buttonStyle}
                    >
                        <Text style={styles.buttonText}>{option}</Text>
                    </TouchableOpacity>
                );
            })}
            {selectedOption !== null && (
                <Text style={styles.answerText}>{isCorrect ? 'Correct answer' : 'Wrong answer, please try again'}</Text>
            )}
        </>
    );
}

const styles = StyleSheet.create({

    quizText: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        textAlign: 'center',
        color: '#FFF',
    },
    button: {
        backgroundColor: '#2b4353',
        minWidth: '85%',
        padding: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8fc2c2',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        textAlign: 'center',
    },
    answerText: {
        color: '#FFF',
        margin: 10,
    }
});

export default MultipleChoice;
