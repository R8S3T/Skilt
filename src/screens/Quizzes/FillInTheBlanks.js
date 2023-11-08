import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { fetchData } from "../../utilities/fetchData";

const FillInTheBlanks = ({ quiz, onContinue }) => {
    const [userInput, setUserInput] = useState([]);
    const [isCorrect, setIsCorrect] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchAnswersForQuiz = async () => {
            try {
                const fetchedAnswers = await fetchData(
                    `SELECT * FROM FillInTheBlanksAnswers WHERE QuizId = ? ORDER BY BlankPosition ASC`,
                    [quiz.QuizId]
                );
                setAnswers(fetchedAnswers);
                setUserInput(fetchedAnswers.map(() => ''));
                console.log(userInput);
            } catch (error) {
                console.error('Error fetching answers:', error);
            }
        };

        if (quiz.Type === 'fill_in_the_blanks') {
            fetchAnswersForQuiz();
        }
    }, [quiz.QuizId, quiz.Type]);

    useEffect(() => {
        console.log(userInput);
      }, [userInput]);

    const handleInputChange = (text, index) => {
        const newUserInput = [...userInput];
        newUserInput[index] = text;
        setUserInput(newUserInput);
    };

    const handleSubmit = () => {
        const allCorrect = answers.every((answer, index) => {
            return answer.AnswerText.trim().toLowerCase() === userInput[index].trim().toLowerCase();
        });

        setIsCorrect(allCorrect);
    };

        const questionParts = quiz.Question.split('___');
        const inputFields = questionParts.slice(0, -1).map((part, index) => (
            <View key={index} style={styles.blankContainer}>
                <Text style={styles.quizText}>{part}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => handleInputChange(text, index)}
                value={userInput[index]}
                placeholder={`Answer #${index + 1}`}
                />

            </View>
        ));

        return (
            <View style={styles.container}>
                {inputFields}
                <Text style={styles.quizText}>{questionParts[questionParts.length - 1]}</Text>
                <Button title='Submit' onPress={handleSubmit} />
                {isCorrect != null && (
                    isCorrect ? <Text>All answers are correct!</Text> : <Text>Some answers are wrong, try again</Text>
                )}
                {isCorrect && <Button title="Continue" onPress={onContinue} />}
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
    blankContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        borderWidth: 1,
        borderColor: '#ddd',
        width: 100,
    }
});


export default FillInTheBlanks;