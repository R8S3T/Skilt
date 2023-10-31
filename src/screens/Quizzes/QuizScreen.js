import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useFetchData from "../../utilities/useFetchData";
import MultipleChoice from "./MultipleChoice";

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

    return (
        <View style={StyleSheet.container}>
            <MultipleChoice quiz={quiz} onContinue={onContinue}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
});

export default QuizScreen;