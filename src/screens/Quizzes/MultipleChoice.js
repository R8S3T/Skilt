import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";

const MultipleChoice = ({ quiz, onContinue }) => {
    console.log(quiz.options); 
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswer = (option) => {
        const correctAnswerSelected = quiz.Answer === option;
        setSelectedOption(option);
        setIsCorrect(correctAnswerSelected);
    }

    const getButtonStyle = (option) => {
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
            {quiz.options.map((option, index) => {
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
