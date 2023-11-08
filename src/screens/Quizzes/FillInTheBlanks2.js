import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { fetchData } from "../../utilities/fetchData";

const FillInTheBlanks = ({ quiz, onContinue }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.quizText}>{quiz.Question}</Text>
            <TextInput
                style={styles.input}
                onChangeText={(text) => console.log(text)}
                value={"Try to edit me"}
                placeholder={"Fill in the blank..."}
            />
        </View>
    );
};

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
        height: 40, // Set a fixed height for testing
        margin: 12,
        borderWidth: 1,
    }
});

export default FillInTheBlanks;