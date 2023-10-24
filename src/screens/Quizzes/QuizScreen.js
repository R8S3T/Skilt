import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import useFetchData from "../../utilities/useFetchData";

const QuizScreen = ({ contentId }) => {
    const query = 'SELECT * FROM Quiz WHERE ContentId =?';
    const { data, error } = useFetchData(query, [contentId]);

    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    if (error) {
        return <Text>Error loading quiz.</Text>;
    }

    if (data.length === 0) {
        return <Text>No quiz found for this content.</Text>
    }

    const quiz = data[0];

    const getButtonStyle = (index) => {
        if (selectedOption === null) {
            return styles.button;
        }
        if (selectedOption === (index + 1)) {
            return (selectedOption === getOptionNumber(quiz.Answer)) ? styles.correctButton : styles.wrongButton;
        }
        return styles.button;
    }

    // Turn answers into integer in order to get the correct answer
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

    const handleAnswer = (optionNumber) => {
        console.log('Selected option number:', optionNumber);
        console.log('Correct answer number:', quiz.Answer);
        const correctOptionNumber = getOptionNumber(quiz.Answer);
        setSelectedOption(optionNumber);
        setIsCorrect(optionNumber === correctOptionNumber);
    }

    const renderContinueButton = () => {
        if (isCorrect) {
            return (
                <Button title='Continue' onPress={() => {/*Navigate to next chapter */}} />
            )
        }
    }

    const renderFeedbackText = () => {
        if (selectedOption !== null) {
            return (isCorrect ? <Text>Correct answer</Text> : <Text>Wrong answer, try again</Text>)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.quizText}>{quiz.Question}</Text>
            {['Option1', 'Option2', 'Option3', 'Option4'].map((option, index) => {
                const buttonStyle = getButtonStyle(index);

                return (
                    <TouchableOpacity
                        key={index}
                        title={quiz[option]}
                        onPress={() => handleAnswer(index +1)}
                        style={buttonStyle}
                    >
                        <Text style={styles.buttonText}>{quiz[option]}</Text>
                    </TouchableOpacity>
                );
            })}
            {renderFeedbackText()}
            {renderContinueButton()}
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

export default QuizScreen;