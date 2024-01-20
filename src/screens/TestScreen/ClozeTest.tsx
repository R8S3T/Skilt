import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ClozeTestProps {
    sentenceParts: string[];
    options: string[];
    correctAnswers: string[];
}

interface AnswerStatus {
    answer: string;
    isCorrect: boolean;
  }

const ClozeTest: React.FC<ClozeTestProps> = ({ sentenceParts, options, correctAnswers }) => {
    const [filledAnswers, setFilledAnswers] = useState<AnswerStatus[]>(
        Array(sentenceParts.length - 1).fill({ answer: '', isCorrect: false })
    );
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleOptionSelect = (option: string) => {
    const nextBlankIndex = filledAnswers.findIndex(answer => answer.answer === '');

        if (nextBlankIndex !== -1) {
            const newAnswers = [...filledAnswers];
            newAnswers[nextBlankIndex] = {
            answer: option,
            isCorrect: false
            };
            setFilledAnswers(newAnswers);
            setSelectedOptions(prev => [...prev, option]);
        }
    };

    const handleClearAnswers = () => {
        setFilledAnswers(Array(sentenceParts.length - 1).fill({ answer: '', isCorrect: false }));
        setSelectedOptions([]);
    };

    const handleSubmit = () => {
        const updatedAnswers = filledAnswers.map((filledAnswer, index) => ({
            answer: filledAnswer.answer,
            isCorrect: filledAnswer.answer === correctAnswers[index]
            }));
            setFilledAnswers(updatedAnswers);

            if (updatedAnswers.every(answer => answer.isCorrect)) {
            alert("Correct!");
            } else {
            alert("Some answers are incorrect, try again!");
            }
        };

    return (
        <View style={styles.container}>
            <Text style={styles.sentence}>
            {sentenceParts.map((part, index) => (
                <Text key={index}>
                    {part}
                    {index < sentenceParts.length - 1 && (
                    <Text style={
                        filledAnswers[index].answer !== ''
                        ? (filledAnswers[index].isCorrect ? styles.correctBlank : styles.incorrectBlank)
                        : styles.blank
                    }>
                        {filledAnswers[index].answer || '___'}
                    </Text>
                    )}
                </Text>
                ))}
            </Text>
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.option}
                        onPress={() => handleOptionSelect(option)}
                        disabled={selectedOptions.includes(option)}
                    >
                        <Text style={styles.optionText}>
                            {selectedOptions.includes(option) ? '' : option}
                        </Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.clearButton} onPress={handleClearAnswers}>
                    <Text style={styles.clearButtonText}>Löschen</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>Bestätigen</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sentence: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
        margin: 20,
    },
    blank: {
        fontWeight: 'bold',
        minWidth: 50,
    },
    correctBlank: {
        fontWeight: 'bold',
        color: 'green',
        minWidth: 50,
    },
    incorrectBlank: {
        fontWeight: 'bold',
        color: 'red',
        minWidth: 50,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    option: {
        backgroundColor: '#2b4353',
        padding: 15,
        margin: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8fc2c2',
        width: '40%', 
    },
    optionText: {
        color: '#FFF',
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        textAlign: 'center',
    },
    clearButton: {
        backgroundColor: '#2b4353',
        minWidth: '85%',
        padding: 10,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#8fc2c2',
        alignSelf: 'center',
    },
    clearButtonText: {
        color: '#FFF',
        fontFamily: 'OpenSans-Regular',
        fontSize: 16,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default ClozeTest;