import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

const FillInTheBlanks = ({ quiz, onContinue }) => {
    const [userInput, setUserInput] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const handleSubmit = () => {
        const correctAnswer = quiz.Answer.trim().toLowerCase();
        if (userInput.trim().toLowerCase() === correctAnswer) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    return (
        <View style={StyleSheet.container}>
            <Text style={styles.quizText}>{quiz.Question}</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUserInput}
                value={userInput}
                placeholder="Fill in the blank..."
            />
            <Button title='Submit' onPress={handleSubmit} />
            {isCorrect != null && (isCorrect ? <Text>Correct answer</Text> : <Text>Wrong answer, try again</Text>)}
            {isCorrect && <Button title="Continue" onPress={onContinue}/>}
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
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 5,
        borderRadius: 4,
    }
});

export default FillInTheBlanks;