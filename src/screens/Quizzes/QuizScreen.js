import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import useFetchData from "../../utilities/useFetchData";

const QuizScreen = ({ contentId }) => {
    const query = 'SELECT * FROM Quiz WHERE ContentId =?';
    const { data, error } = useFetchData(query, [contentId]);

    if (error) {
        return <Text>Error loading quiz.</Text>;
    }

    if (data.length === 0) {
        return <Text>No quiz found for this content.</Text>
    }

        const quiz = data[0];


    return (
        <View style={styles.container}>
            <Text style={styles.quizText}>{quiz.Question}</Text>
            <Button title={quiz.Option1} onPress={() => {/* Handle Answer */}} />
            <Button title={quiz.Option2} onPress={() => {/* Handle Answer */}} />
            <Button title={quiz.Option3} onPress={() => {/* Handle Answer */}} />
            <Button title={quiz.Option4} onPress={() => {/* Handle Answer */}} />
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
    }
});

export default QuizScreen;