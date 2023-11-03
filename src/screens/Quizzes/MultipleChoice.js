import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

const MultipleChoice = ({ quiz, onContinue }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswer = (optionNumber) => {
        const correctOptionNumber = getOptionNumber(quiz.Answer);
        const correctAnswerSelected = optionNumber === correctOptionNumber;
        setSelectedOption(optionNumber);
        setIsCorrect(correctAnswerSelected);
    }

    const getButtonStyle = (index) => {
        if (selectedOption === null) {
            return styles.button;
        }
        if (selectedOption === (index + 1)) {
            return (selectedOption === getOptionNumber(quiz.Answer)) ? styles.correctButton : styles.wrongButton;
        }
        return styles.button;
    }

    const optionMapping = {
        'Option1': 1,
        'Option2': 2,
        'Option3': 3,
        'Option4': 4
    }

    const getOptionNumber = (answerText) => {
        const optionKey = Object.keys(quiz).find(key => quiz[key] === answerText);
        return optionMapping[optionKey];
    }

    return (
        <View style={styles.container}>
            <Text style={styles.quizText}>{quiz.Question}</Text>
            {['Option1', 'Option2', 'Option3', 'Option4'].map((option, index) => {
                const buttonStyle = getButtonStyle(index);

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleAnswer(index +1)}
                        style={buttonStyle}
                    >
                        <Text style={styles.buttonText}>{quiz[option]}</Text>
                    </TouchableOpacity>
                );
            })}
            {selectedOption !== null && (isCorrect ? <Text>Correct answer</Text> : <Text>Wrong answer, try again</Text>)}
            {isCorrect && <Button title='Continue' onPress={onContinue} />}
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
