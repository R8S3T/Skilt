import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ClozeTestProps {
    sentenceParts: string[];
    options: string[];
    correctAnswers: string[];
}

const ClozeTest: React.FC<ClozeTestProps> = ({ sentenceParts, options, correctAnswers }) => {
    const [filledAnswers, setFilledAnswers] = useState<string[]>(Array(sentenceParts.length - 1).fill(''));

    const handleOptionSelect = (option: string) => {
        const nextBlankIndex = filledAnswers.findIndex(answer => answer === '');
        if (nextBlankIndex !== -1) {
            const newAnswers = [...filledAnswers];
            newAnswers[nextBlankIndex] = option;
            setFilledAnswers(newAnswers);
        }
    };

    const handleClearAnswers = () => {
        setFilledAnswers(Array(sentenceParts.length - 1).fill(''));
    };

    const handleSubmit = () => {
        const isCorrect = JSON.stringify(filledAnswers) === JSON.stringify(correctAnswers);
        if (isCorrect) {
            alert("Correct!");
        } else {
            alert("Incorrect, try again!");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sentence}>
                {sentenceParts.map((part, index) => (
                    <Text key={index}>
                        {part}
                        {index < sentenceParts.length - 1 && (
                            <Text style={styles.blank}>{filledAnswers[index] || '___'}</Text>
                        )}
                    </Text>
                ))}
            </Text>
            <View style={styles.optionsContainer}>
            {options.map((option, index) => (
                <TouchableOpacity key={index} style={styles.option} onPress={() => handleOptionSelect(option)}>
                <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}
                <TouchableOpacity style={styles.clearButton} onPress={handleClearAnswers}>
                    <Text style={styles.clearButtonText}>Clear</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    sentence: {
        fontSize: 18,
        marginBottom: 20,
    },
    blank: {
        fontWeight: 'bold',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    option: {
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 5,
    },
    optionText: {
        fontSize: 16,
    },
    clearButton: {
        backgroundColor: 'red', // Choose a suitable color
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    clearButtonText: {
        color: 'white', // Choose a suitable text color
        textAlign: 'center',
        fontSize: 16,
    },
    submitButton: {
        backgroundColor: 'green', // Choose a suitable color
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white', // Choose a suitable text color
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ClozeTest;