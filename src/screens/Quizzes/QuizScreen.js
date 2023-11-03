import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useFetchData from "../../utilities/useFetchData";
import MultipleChoice from "./MultipleChoice";
import FillInTheBlanks from "./FillInTheBlanks";

const QuizScreen = ({ contentId, onContinue }) => {
    const query = 'SELECT * FROM Quiz WHERE ContentId =?';
    const { data, error } = useFetchData(query, [contentId]);

    if (error) {
        return <Text>Error loading quiz.</Text>;
    }

    if (data.length === 0) {
        return <Text>No quiz found for this content.</Text>
    }

    const quiz = data[0];

    if (quiz.type === 'multiple_choice') {
        return (
            <View style={styles.container}>
                <MultipleChoice quiz={quiz} onContinue={onContinue}/>
            </View>
        );
    } else if (quiz.type === 'fill_in_the_blanks') {
        return (
            <View style={styles.container}>
                <FillInTheBlanks quiz={quiz} onContinue={onContinue}/>
            </View>
        );
    }

    return <Text>Unsupported quiz type.</Text>
}

export default QuizScreen;