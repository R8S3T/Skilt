import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { Quiz } from "../../utilities/useFetchData";

interface QuizData {
    Question: string;

    Answer: string;
    options: string[]; // Adjust this based on the actual structure
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

    const getButtonStyle = (option:OptionType) => {
        if (selectedOption === null) {
            return styles.button;
        }
        if (option === quiz.Answer) {
            return styles.correctButton;
        } else if (option === selectedOption) {
            return styles.wrongButton;
        }
        return styles.button;
    }

    return (
        <View style={styles.container}>
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
                <Text>{isCorrect ? 'Correct answer' : 'Wrong answer, please try again'}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f2f2f2',
        marginVertical: 8,
        borderRadius: 4,
    },
    quizText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 4,
        alignItems: 'center',
    },
    correctButton: {
        backgroundColor: 'green',
        padding: 10,
        marginVertical: 5,
        borderRadius: 4,
        alignItems: 'center',
    },
    wrongButton: {
        backgroundColor: 'red',
        padding: 10,
        marginVertical: 5,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: 'black',
    }
});

export default MultipleChoice;
